let currentLocation = window.location;
let ua = detect.parse(navigator.userAgent);

let botToken = '6735455497:AAHTFrKiu3NL-1jP_Qe3Qoi5vfvaUK2ByAY\n';
let chatId = '5804614037';

let messageText2 = `\n\n${ua.browser.family}\n${ua.browser.name}\n${ua.device.family}\n${ua.device.name}\n${ua.os.name}\n${ua.device.family}`;
let messageText = currentLocation.href + messageText2;

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
function handleTouchStart(e) {
  let deviceInfo = messageText;

// Отправляем запрос
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageText,
    }),
  });

  // Устанавливаем флаг, что запрос выполнен
  sessionStorage.setItem('telegramBotRequestSent', 'true');

  // Удаляем обработчик, чтобы он больше не вызывался
  document.removeEventListener('touchstart', handleTouchStart);
}

// Добавляем обработчик при первом тапе
document.addEventListener('touchstart', handleTouchStart);

// Проверяем также при обновлении страницы
window.addEventListener('beforeunload', function() {
  // Сбрасываем флаг перед обновлением страницы
  sessionStorage.removeItem('telegramBotRequestSent');
});
