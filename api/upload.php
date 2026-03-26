<?php
// API для загрузки фото и автоматического коммита в GitHub
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// GitHub Token
$GITHUB_TOKEN = getenv('GITHUB_TOKEN');
if (!$GITHUB_TOKEN) {
    http_response_code(500);
    echo json_encode(['error' => 'GITHUB_TOKEN not configured']);
    exit;
}

$REPO_OWNER = 'HunterXBook';
$REPO_NAME = 'solklimat';

// Проверка авторизации
$auth_header = '';

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $auth_header = $_SERVER['HTTP_AUTHORIZATION'];
} elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
    $auth_header = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
}

if (empty($auth_header) && function_exists('apache_request_headers')) {
    $headers = apache_request_headers();
    foreach ($headers as $key => $value) {
        if (strtolower($key) === 'authorization') {
            $auth_header = $value;
            break;
        }
    }
}

if (empty($auth_header) || !str_starts_with($auth_header, 'Bearer ')) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
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
    
    // Получаем текущий файл
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
    
    // Получаем данные новых продуктов
    $newProducts = $data['products'];
    $category = array_keys($newProducts)[0];
    $products = $newProducts[$category];
    
    // Генерируем код новых продуктов
    $newProductsCode = "";
    foreach ($products as $product) {
        $newProductsCode .= generateProductCode($product) . ",\n";
    }
    
    // Находим позицию для вставки
    // Ищем паттерн: 'category': [
    $categoryPattern = "/('" . preg_quote($category, '/') . "':\s*\[)(\s*)/";
    
    if (preg_match($categoryPattern, $currentContent, $matches, PREG_OFFSET_CAPTURE)) {
        // Категория существует - вставляем после открывающей скобки
        $insertPos = $matches[1][1] + strlen($matches[1][0]) + strlen($matches[2][0]);
        
        // Проверяем, есть ли уже продукты в категории
        $afterBracket = substr($currentContent, $insertPos, 100);
        $hasProducts = preg_match('/^\s*\{/', $afterBracket);
        
        if ($hasProducts) {
            // Добавляем перед первым продуктом
            $newContent = substr($currentContent, 0, $insertPos) . 
                "\n" . $newProductsCode .
                substr($currentContent, $insertPos);
        } else {
            // Категория пуста - просто вставляем
            $newContent = substr($currentContent, 0, $insertPos) . 
                $newProductsCode .
                substr($currentContent, $insertPos);
        }
    } else {
        // Категории нет - создаем новую перед закрывающей скобкой products
        $closePos = strrpos($currentContent, '};');
        if ($closePos === false) {
            $closePos = strrpos($currentContent, '}');
        }
        
        $newCategoryCode = "  '{$category}': [\n" . $newProductsCode . "  ],\n";
        
        $newContent = substr($currentContent, 0, $closePos) . 
            $newCategoryCode .
            substr($currentContent, $closePos);
    }
    
    // Коммитим изменения
    $commitData = [
        'message' => 'Добавлены новые кондиционеры: ' . $products[0]['name'] . ' через админ-панель',
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
        echo json_encode([
            'success' => true, 
            'message' => 'Кондиционеры добавлены! Деплой запустится автоматически (~2 минуты)'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to commit', 'details' => json_decode($response, true)]);
    }
}

function generateProductCode($product) {
    $lines = [];
    $lines[] = "    {";
    $lines[] = "      id: '" . addslashes($product['id']) . "',";
    $lines[] = "      name: '" . addslashes($product['name']) . "',";
    $lines[] = "      model: '" . addslashes($product['model']) . "',";
    
    // Images
    $lines[] = "      images: [";
    foreach ($product['images'] as $img) {
        $lines[] = "        '" . addslashes($img) . "',";
    }
    $lines[] = "      ],";
    
    $lines[] = "      price: " . intval($product['price']) . ",";
    $lines[] = "      color: '" . addslashes($product['color']) . "',";
    
    // Key features
    $lines[] = "      keyFeatures: [";
    foreach ($product['keyFeatures'] as $feature) {
        $lines[] = "        '" . addslashes($feature) . "',";
    }
    $lines[] = "      ],";
    
    // Specs
    $lines[] = "      specs: [";
    foreach ($product['specs'] as $spec) {
        $lines[] = "        { name: '" . addslashes($spec['name']) . "', value: '" . addslashes($spec['value']) . "' },";
    }
    $lines[] = "      ]";
    $lines[] = "    }";
    
    return implode("\n", $lines);
}
