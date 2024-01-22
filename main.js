 let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6163011453:AAE2E6uKEE1hyQ3knu7tjJpYwIDvS7yEQPg';
let chatId = '5303172024';
let messageText = currentLocation.href;
console.log(messageText, 'вот');

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

let startTouchX;
let requestSent = false;

document.addEventListener('touchstart', function (e) {
  startTouchX = e.touches[0].clientX;
  requestSent = false; // Сбрасываем флаг при каждом новом касании
});

document.addEventListener('touchmove', function (e) {
  if (!requestSent) { // Проверяем, не отправлен ли уже запрос
    let currentTouchX = e.touches[0].clientX;
    let swipeDistance = currentTouchX - startTouchX;

    if (swipeDistance > 80) {
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

      requestSent = true; // Устанавливаем флаг, что запрос отправлен
    }
  }
});
