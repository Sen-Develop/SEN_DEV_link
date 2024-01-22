 /*let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6163011453:AAE2E6uKEE1hyQ3knu7tjJpYwIDvS7yEQPg';
let chatId = '5303172024';
let messageText = currentLocation.href;
console.log(messageText, 'вот');

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

let startTouchX;

document.addEventListener('touchstart', function (e) {
  startTouchX = e.touches[0].clientX;
});

document.addEventListener('touchmove', function (e) {
  let currentTouchX = e.touches[0].clientX;
  let swipeDistance = currentTouchX - startTouchX;


 if (swipeDistance > 50) {

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


    startTouchX = null;
  }
});*/
