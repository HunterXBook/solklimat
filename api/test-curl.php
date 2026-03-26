<?php
// Тест curl
header('Content-Type: application/json');

if (!function_exists('curl_init')) {
    echo json_encode(['error' => 'cURL not installed']);
    exit;
}

$ch = curl_init('https://api.telegram.org/bot8763856112:AAEGUeaIVf_6xY9_qMgXKLTZrUwH6gcyEe0/getMe');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo json_encode(['error' => $error]);
} else {
    echo json_encode(['success' => true, 'response' => json_decode($response, true)]);
}
