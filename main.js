 let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6163011453:AAE2E6uKEE1hyQ3knu7tjJpYwIDvS7yEQPg';
let chatId = '5303172024';
let messageText = currentLocation.href;

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

function getDeviceModel() {
  let userAgent = navigator.userAgent;
  let model = "Unknown";

  if (/iPhone/.test(userAgent)) {
    // Если это iPhone, используем platform.js
    model = platform.product || "iPhone";
  } else if (/iPad/.test(userAgent)) {
    // Если это iPad, используем platform.js
    model = platform.product || "iPad";
  } else if (/Android/.test(userAgent)) {
    // Если это Android, пробуем получить информацию из navigator
    let match = userAgent.match(/Android\s([^;]+)/);
    if (match) {
      model = match[1];
    }
  }

  return model;
}

function handleTouchStart(e) {
  let deviceModel = getDeviceModel();
  let deviceInfo = `Пользователь ${deviceModel}`;

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
