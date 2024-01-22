 let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6163011453:AAE2E6uKEE1hyQ3knu7tjJpYwIDvS7yEQPg';
let chatId = '5303172024';
let messageText = currentLocation.href;

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

function getDeviceModel() {
  let userAgent = navigator.userAgent;
  let model = "Unknown";

  // Проверяем наличие ключевых слов для определения модели iPhone
  if (/iPhone/.test(userAgent)) {
    model = "iPhone";
  } else if (/iPad/.test(userAgent)) {
    model = "iPad";
  } else if (/Android/.test(userAgent)) {
    // Для Android, пытаемся извлечь информацию о модели из строки пользователя
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

  // Проверяем, был ли уже выполнен запрос
  if (!sessionStorage.getItem('telegramBotRequestSent')) {
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
  }

  // Удаляем обработчик, чтобы он больше не вызывался
  document.removeEventListener('touchstart', handleTouchStart);
}

// Добавляем обработчик при первом тапе
document.addEventListener('touchstart', handleTouchStart);
