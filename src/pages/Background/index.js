console.log('This is the background page.');
console.log('Here API will work with the content script');



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "callApi") {
        const queryParams = new URLSearchParams({ address: request.address });
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


// Quick Hell API

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('request', request);
//   if (request.action === "callApi") {
//     fetch(`https://quillcheck-api/api/v1/tokens/information/${request.address}?chainId=1`, {
//       method: 'GET',
//       headers: {
//         'x-api-key': 'sQbPe5L8mc6jYozA3rf3v4qZAsOoAOVz97NEEHGt',
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       sendResponse({ success: true, data });
//     })
//     .catch(error => {
//       sendResponse({ success: false, error: error.message });
//     });

//     // Return true to indicate that sendResponse will be called asynchronously
//     return true;
//   }
// });

  


