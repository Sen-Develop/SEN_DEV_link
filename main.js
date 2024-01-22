 let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6163011453:AAE2E6uKEE1hyQ3knu7tjJpYwIDvS7yEQPg';
let chatId = '5303172024';
let messageText = currentLocation.href;
console.log(messageText, 'вот');

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

let touchOccurred = false;

document.addEventListener('touchstart', function (e) {
  if (!touchOccurred) {  // Проверяем, не было ли уже касания
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

    touchOccurred = true;  // Устанавливаем флаг, что касание произошло
  }
});

