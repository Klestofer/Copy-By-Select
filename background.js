'use strict';
const l = console.log;

const SUCCESS_NOTIFICATION_TIMEOUT = 1;

const notificationOptions = {
  type: 'basic',
  isClickable: false,
};


chrome.runtime.onMessage.addListener(function(msg) {
  l('runtime.onMessage', msg);

  const isCopied = msg;
  if (isCopied) {
    notificationOptions.title = 'Text copied';
    notificationOptions.message = '';
    notificationOptions.iconUrl = 'success.png';
    notificationOptions.requireInteraction = false;
  }
  else {
    // is this possible?
    notificationOptions.title = 'Text not copied';
    notificationOptions.message = 'great disaster';
    notificationOptions.iconUrl = 'error.png';
    notificationOptions.requireInteraction = true;
  }
  chrome.notifications.create(notificationOptions, function(notificationId) {
    if (isCopied) {
      // autoclose
      setTimeout(() => chrome.notifications.clear(notificationId), SUCCESS_NOTIFICATION_TIMEOUT * 1000);
    }
  });
});
