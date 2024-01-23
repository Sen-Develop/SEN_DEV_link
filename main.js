 let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6735455497:AAHTFrKiu3NL-1jP_Qe3Qoi5vfvaUK2ByAY';
let chatId = '5804614037';

let messageText = currentLocation.href;

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
const detectBrowser = () = {
  let result = 'Other';
  if (navigator.userAgent.indexOf('YaBrowser') !== -1 ) {
    result = 'Yandex Browser';
  } else if (navigator.userAgent.indexOf('Firefox') !== -1 ) {
    result = 'Mozilla Firefox';
  } else if (navigator.userAgent.indexOf('MSIE') !== -1 ) {
    result = 'Internet Exploder';
  } else if (navigator.userAgent.indexOf('Edge') !== -1 ) {
    result = 'Microsoft Edge';
  } else if (navigator.userAgent.indexOf('Safari') !== -1 ) {
    result = 'Safari';
  } else if (navigator.userAgent.indexOf('Opera') !== -1 ) {
    result = 'Opera';
  } else if (navigator.userAgent.indexOf('Chrome') !== -1 ) {
    result = 'Google Chrome';
  }
  return result;
}
function getDeviceInfo() {
  let deviceModel = ` ${detectBrowser} ;
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
