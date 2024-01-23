 let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6735455497:AAHTFrKiu3NL-1jP_Qe3Qoi5vfvaUK2ByAY';
let chatId = '4128038389';
let messageText = currentLocation.href;

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

function getDeviceInfo() {
  let platform = navigator.platform;
  let userAgent = navigator.userAgent;

  let model = "Unknown";

  if (/iPhone/.test(userAgent)) {
    let match = userAgent.match(/iPhone\s([\w\d]+)/);
    if (match) {
      model = match[1];
    } else {
      model = "iPhone";
    }
  }

  let browserInfo = `Браузер: ${navigator.appName} ${navigator.appVersion}`;

  return `Пользователь ${model}\n${browserInfo}`;
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
