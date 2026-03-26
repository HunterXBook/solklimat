<?php
// API для загрузки фото
// Автокоммит временно отключен - нужно ручное копирование JSON

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

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

if (empty($auth_header)) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if (!str_starts_with($auth_header, 'Bearer ')) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid auth format']);
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
        // Автокоммит отключен - возвращаем JSON для ручного копирования
        handleGenerateJson();
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

function handleGenerateJson() {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['products'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        return;
    }
    
    // Генерируем TypeScript код
    $output = generateTypeScriptCode($data['products']);
    
    echo json_encode([
        'success' => true,
        'typescript' => $output,
        'message' => 'Скопируйте этот код и вставьте в src/data/productData.ts'
    ]);
}

function generateTypeScriptCode($products) {
    $category = array_keys($products)[0];
    $items = $products[$category];
    
    $code = "  '{$category}': [\n";
    
    foreach ($items as $product) {
        $code .= "    {\n";
        $code .= "      id: '" . addslashes($product['id']) . "',\n";
        $code .= "      name: '" . addslashes($product['name']) . "',\n";
        $code .= "      model: '" . addslashes($product['model']) . "',\n";
        
        // Images
        $code .= "      images: [\n";
        foreach ($product['images'] as $img) {
            $code .= "        '" . addslashes($img) . "',\n";
        }
        $code .= "      ],\n";
        
        $code .= "      price: " . intval($product['price']) . ",\n";
        $code .= "      color: '" . addslashes($product['color']) . "',\n";
        
        // Key features
        $code .= "      keyFeatures: [\n";
        foreach ($product['keyFeatures'] as $feature) {
            $code .= "        '" . addslashes($feature) . "',\n";
        }
        $code .= "      ],\n";
        
        // Specs
        $code .= "      specs: [\n";
        foreach ($product['specs'] as $spec) {
            $code .= "        { name: '" . addslashes($spec['name']) . "', value: '" . addslashes($spec['value']) . "' },\n";
        }
        $code .= "      ]\n";
        $code .= "    },\n";
    }
    
    $code .= "  ]";
    
    return $code;
}
