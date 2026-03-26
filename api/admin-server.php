<?php
// Серверная админка для добавления кондиционеров
// Редактирует productData.ts и делает git push

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Проверка авторизации
$auth_header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if (!str_starts_with($auth_header, 'Bearer ') || substr($auth_header, 7) !== 'solklimatadmin1975') {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'upload':
        handleUpload();
        break;
    case 'add-product':
        handleAddProduct();
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

function handleUpload() {
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No image']);
        return;
    }
    
    $file = $_FILES['image'];
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = strtolower(preg_replace('/[^a-z0-9]/', '-', $_POST['product_name'] ?? 'product'));
    $filename .= '-' . time() . '.' . $ext;
    
    $uploadDir = __DIR__ . '/../images/products/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
    
    if (move_uploaded_file($file['tmp_name'], $uploadDir . $filename)) {
        echo json_encode(['success' => true, 'url' => '/images/products/' . $filename]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Upload failed']);
    }
}

function handleAddProduct() {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['product'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        return;
    }
    
    $product = $data['product'];
    $category = $data['category'] ?? 'split';
    
    // Путь к репозиторию
    $repoPath = __DIR__ . '/../../'; // Корень репозитория
    $filePath = $repoPath . 'src/data/productData.ts';
    
    // Читаем текущий файл
    $content = file_get_contents($filePath);
    if (!$content) {
        http_response_code(500);
        echo json_encode(['error' => 'Cannot read productData.ts']);
        return;
    }
    
    // Генерируем код продукта
    $productCode = generateProductCode($product);
    
    // Находим место для вставки
    $pattern = "/('" . preg_quote($category, '/') . "':\s*\[)(\s*)/";
    if (preg_match($pattern, $content, $matches, PREG_OFFSET_CAPTURE)) {
        $insertPos = $matches[1][1] + strlen($matches[1][0]) + strlen($matches[2][0]);
        $newContent = substr($content, 0, $insertPos) . $productCode . substr($content, $insertPos);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Category not found']);
        return;
    }
    
    // Записываем файл
    if (!file_put_contents($filePath, $newContent)) {
        http_response_code(500);
        echo json_encode(['error' => 'Cannot write file']);
        return;
    }
    
    // Git commit и push
    $originalDir = getcwd();
    chdir($repoPath);
    
    exec('git add src/data/productData.ts 2>&1', $addOutput, $addCode);
    exec('git commit -m "Добавлен кондиционер: ' . escapeshellarg($product['name']) . ' через админ-панель" 2>&1', $commitOutput, $commitCode);
    exec('git push origin main 2>&1', $pushOutput, $pushCode);
    
    chdir($originalDir);
    
    if ($pushCode === 0) {
        echo json_encode(['success' => true, 'message' => 'Продукт добавлен и запушен']);
    } else {
        // Откатываем изменения если push не удался
        exec('cd ' . escapeshellarg($repoPath) . ' && git reset --hard HEAD 2>&1');
        http_response_code(500);
        echo json_encode(['error' => 'Git push failed', 'details' => implode("\n", $pushOutput)]);
    }
}

function generateProductCode($product) {
    $lines = [];
    $lines[] = "    {";
    $lines[] = "      id: '" . addslashes($product['id']) . "',";
    $lines[] = "      name: '" . addslashes($product['name']) . "',";
    $lines[] = "      model: '" . addslashes($product['model']) . "',";
    $lines[] = "      images: [";
    foreach ($product['images'] as $img) {
        $lines[] = "        '" . addslashes($img) . "',";
    }
    $lines[] = "      ],";
    $lines[] = "      price: " . intval($product['price']) . ",";
    $lines[] = "      color: '" . addslashes($product['color']) . "',";
    $lines[] = "      keyFeatures: [";
    foreach ($product['keyFeatures'] as $f) {
        $lines[] = "        '" . addslashes($f) . "',";
    }
    $lines[] = "      ],";
    $lines[] = "      specs: [";
    foreach ($product['specs'] as $s) {
        $lines[] = "        { name: '" . addslashes($s['name']) . "', value: '" . addslashes($s['value']) . "' },";
    }
    $lines[] = "      ]";
    $lines[] = "    },\n";
    
    return implode("\n", $lines);
}
