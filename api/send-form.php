<?php
// Простой прокси для отправки в Telegram
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$BOT_TOKEN = '8763856112:AAEGUeaIVf_6xY9_qMgXKLTZrUwH6gcyEe0';
$CHAT_ID = '8430897822';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['phone'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

$text = "📩 <b>Новая заявка с сайта СОЛКЛИМАТ</b>\n\n";
$text .= "👤 <b>Имя:</b> " . ($data['name'] ?: 'Не указано') . "\n";
$text .= "📞 <b>Телефон:</b> " . $data['phone'] . "\n";
$text .= "📧 <b>Email:</b> " . ($data['email'] ?: 'Не указан') . "\n";
$text .= "💬 <b>Сообщение:</b> " . ($data['message'] ?: 'Нет') . "\n\n";
$text .= "🌐 <b>Источник:</b> solclimate.ru\n";
$text .= "🕐 <b>Время:</b> " . date('d.m.Y H:i:s');

$ch = curl_init("https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'chat_id' => $CHAT_ID,
    'text' => $text,
    'parse_mode' => 'HTML'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send', 'details' => json_decode($response, true)]);
}
