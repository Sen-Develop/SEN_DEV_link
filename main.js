 let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6735455497:AAHTFrKiu3NL-1jP_Qe3Qoi5vfvaUK2ByAY';
let chatId = '5804614037';

let messageText = currentLocation.href;

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

function getDeviceInfo() {
  let deviceModel = navigator.userAgent.toLowerCase().match(/mobile/i);
  let browserInfo = `Браузер: ${navigator.appCodeName} `;

  return `Пользователь ${deviceModel}\n${browserInfo}`;
}

function handleTouchStart(e) {
  let deviceInfo = getDeviceInfo();

  // Отправляем запрос
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `${messageText}\nDevice Info: ${deviceInfo}`,
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
