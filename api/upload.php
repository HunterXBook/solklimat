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

// Проверка авторизации
$headers = getallheaders();
$auth_header = $headers['Authorization'] ?? '';

if (!str_starts_with($auth_header, 'Bearer ')) {
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

    // Генерируем имя файла
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = strtolower(preg_replace('/[^a-z0-9]/', '-', $_POST['product_name'] ?? 'product'));
    $filename .= '-' . time() . '.' . $ext;
    
    // Путь для сохранения
    $uploadDir = __DIR__ . '/../public/images/products/';
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
    
    // Получаем текущий файл productData.ts
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
    
    // Добавляем новые продукты в существующий объект products
    $newProducts = $data['products'];
    $category = array_keys($newProducts)[0];
    $products = $newProducts[$category];
    
    // Формируем строки для добавления
    $productLines = [];
    foreach ($products as $product) {
        $productLines[] = generateProductCode($product);
    }
    
    // Находим место для вставки (перед закрывающей скобкой объекта products)
    $insertMarker = "'{$category}': [";
    if (strpos($currentContent, $insertMarker) === false) {
        // Категории нет — добавляем новую
        $insertPos = strrpos($currentContent, '}');
        $newContent = substr($currentContent, 0, $insertPos) . 
            "  '{$category}': [\n" .
            implode(",\n", $productLines) . "\n  ],\n" .
            substr($currentContent, $insertPos);
    } else {
        // Категория есть — добавляем в существующую
        $pattern = "/('{$category}': \[)(.*?)(\])/s";
        $newContent = preg_replace($pattern, '$1$2' . ",\n" . implode(",\n", $productLines) . '$3', $currentContent, 1);
    }
    
    // Коммитим изменения
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
    $specs = array_map(function($spec) {
        return "        { name: '{$spec['name']}', value: '{$spec['value']}' }";
    }, $product['specs'] ?? []);
    
    $keyFeatures = array_map(function($feature) {
        return "        '{$feature}'";
    }, $product['keyFeatures'] ?? []);
    
    $images = array_map(function($img) {
        return "        '{$img}'";
    }, $product['images'] ?? []);
    
    return <<<CODE
    {
      id: '{$product['id']}',
      name: '{$product['name']}',
      model: '{$product['model']}',
      images: [
{$images}
      ],
      price: {$product['price']},
      color: '{$product['color']}',
      keyFeatures: [
{$keyFeatures}
      ],
      specs: [
{$specs}
      ]
    }
CODE;
}
