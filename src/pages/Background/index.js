// console.log('This is the background page.');
// console.log('Here API will work with the content script');

//
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkToken") {
      const queryParams = new URLSearchParams({ address: request.tokenAddress });
      fetch('https://api.honeypot.is/v2/IsHoneypot?' + queryParams, {
        method: 'GET',
        headers: {
          'X-API-KEY': ''
        }
      })
      .then(response => response.json())
      .then(data => {
        sendResponse({ success: true, data });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
      return true;
    }
  });
  





