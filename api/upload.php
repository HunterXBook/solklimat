<?php
// API для загрузки фото и автоматического коммита в GitHub
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// GitHub Token - должен быть установлен в переменной окружения
$GITHUB_TOKEN = getenv('GITHUB_TOKEN');
if (!$GITHUB_TOKEN) {
    http_response_code(500);
    echo json_encode(['error' => 'GITHUB_TOKEN not configured']);
    exit;
}

$REPO_OWNER = 'HunterXBook';
$REPO_NAME = 'solklimat';

// Проверка авторизации - поддержка разных способов
$auth_header = '';

// Способ 1: $_SERVER (самый надежный с .htaccess)
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $auth_header = $_SERVER['HTTP_AUTHORIZATION'];
} elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
    $auth_header = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
}

// Способ 2: apache_request_headers
if (empty($auth_header) && function_exists('apache_request_headers')) {
    $headers = apache_request_headers();
    foreach ($headers as $key => $value) {
        if (strtolower($key) === 'authorization') {
            $auth_header = $value;
            break;
        }
    }
}

// Способ 3: getallheaders
if (empty($auth_header) && function_exists('getallheaders')) {
    $headers = getallheaders();
    foreach ($headers as $key => $value) {
        if (strtolower($key) === 'authorization') {
            $auth_header = $value;
            break;
        }
    }
}

if (empty($auth_header)) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized', 'debug' => 'No authorization header found']);
    exit;
}

if (!str_starts_with($auth_header, 'Bearer ')) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized', 'debug' => 'Invalid auth format']);
    exit;
}

$token = substr($auth_header, 7);
if ($token !== 'solklimatadmin1975') {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid token']);
    exit;
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'upload':
        handleUpload();
        break;
    case 'commit':
        handleCommit();
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

function handleUpload() {
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No image uploaded']);
        return;
    }

    $file = $_FILES['image'];
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!in_array($file['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Only JPG, PNG, WebP allowed']);
        return;
    }

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = strtolower(preg_replace('/[^a-z0-9]/', '-', $_POST['product_name'] ?? 'product'));
    $filename .= '-' . time() . '.' . $ext;
    
    $uploadDir = __DIR__ . '/../images/products/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $filepath = $uploadDir . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $filepath)) {
        $url = '/images/products/' . $filename;
        echo json_encode([
            'success' => true,
            'url' => $url,
            'filename' => $filename
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save image']);
    }
}

function handleCommit() {
    global $GITHUB_TOKEN, $REPO_OWNER, $REPO_NAME;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['products'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        return;
    }
    
    $fileUrl = "https://api.github.com/repos/{$REPO_OWNER}/{$REPO_NAME}/contents/src/data/productData.ts";
    
    $ch = curl_init($fileUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: token {$GITHUB_TOKEN}",
        "Accept: application/vnd.github.v3+json",
        "User-Agent: Solklimat-Admin"
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $fileInfo = json_decode($response, true);
    if (!isset($fileInfo['content'])) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch file', 'details' => $fileInfo]);
        return;
    }
    
    $currentContent = base64_decode($fileInfo['content']);
    $sha = $fileInfo['sha'];
    
    $newProducts = $data['products'];
    $category = array_keys($newProducts)[0];
    $products = $newProducts[$category];
    
    $productLines = [];
    foreach ($products as $product) {
        $productLines[] = generateProductCode($product);
    }
    
    $insertMarker = "'{$category}': [";
    if (strpos($currentContent, $insertMarker) === false) {
        $insertPos = strrpos($currentContent, '}');
        $newContent = substr($currentContent, 0, $insertPos) . 
            "  '{$category}': [\n" .
            implode(",\n", $productLines) . "\n  ],\n" .
            substr($currentContent, $insertPos);
    } else {
        $pattern = "/('{$category}': \[)(.*?)(\])/s";
        $newContent = preg_replace($pattern, '$1$2' . ",\n" . implode(",\n", $productLines) . '$3', $currentContent, 1);
    }
    
    $commitData = [
        'message' => 'Добавлены новые кондиционеры через админ-панель',
        'content' => base64_encode($newContent),
        'sha' => $sha
    ];
    
    $ch = curl_init($fileUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($commitData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: token {$GITHUB_TOKEN}",
        "Accept: application/vnd.github.v3+json",
        "Content-Type: application/json",
        "User-Agent: Solklimat-Admin"
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200 || $httpCode === 201) {
        echo json_encode(['success' => true, 'message' => 'Changes committed successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to commit', 'details' => json_decode($response, true)]);
    }
}

function generateProductCode($product) {
    $specsStr = '';
    foreach ($product['specs'] ?? [] as $spec) {
        $specsStr .= "        { name: '" . addslashes($spec['name']) . "', value: '" . addslashes($spec['value']) . "' },\n";
    }
    $specsStr = rtrim($specsStr, ",\n");
    
    $keyFeaturesStr = '';
    foreach ($product['keyFeatures'] ?? [] as $feature) {
        $keyFeaturesStr .= "        '" . addslashes($feature) . "',\n";
    }
    $keyFeaturesStr = rtrim($keyFeaturesStr, ",\n");
    
    $imagesStr = '';
    foreach ($product['images'] ?? [] as $img) {
        $imagesStr .= "        '" . addslashes($img) . "',\n";
    }
    $imagesStr = rtrim($imagesStr, ",\n");
    
    return "    {\n" .
        "      id: '" . addslashes($product['id']) . "',\n" .
        "      name: '" . addslashes($product['name']) . "',\n" .
        "      model: '" . addslashes($product['model']) . "',\n" .
        "      images: [\n" . $imagesStr . "\n      ],\n" .
        "      price: " . intval($product['price']) . ",\n" .
        "      color: '" . addslashes($product['color']) . "',\n" .
        "      keyFeatures: [\n" . $keyFeaturesStr . "\n      ],\n" .
        "      specs: [\n" . $specsStr . "\n      ]\n" .
        "    }";
}
