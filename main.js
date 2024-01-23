 let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6163011453:AAE2E6uKEE1hyQ3knu7tjJpYwIDvS7yEQPg';
let chatId = '5303172024';
let messageText = currentLocation.href;

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

function getDeviceInfo() {
  let userAgent = navigator.userAgent;
  let browserInfo = `Браузер: ${navigator.appName} ${navigator.appVersion}`;
  let model = "Unknown";

  if (/iPhone/.test(userAgent)) {
    let match = userAgent.match(/iPhone\s([\w\d]+)/);
    if (match) {
      model = match[1];
    } else {
      model = "iPhone";
    }
  } else if (/iPad/.test(userAgent)) {
    model = "iPad";
  } else if (/Android/.test(userAgent)) {
    let match = userAgent.match(/Android\s([^;]+)/);
    if (match) {
      model = match[1];
    }
  }

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
