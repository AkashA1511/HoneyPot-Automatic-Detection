// console.log('This is the background page.');
// console.log('Here API will work with the content script');

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "callApi") {
//         const queryParams = new URLSearchParams({ address: request.address });
//         fetch('https://api.honeypot.is/v2/IsHoneypot?' + queryParams, {
//             method: 'GET',
//             headers: {
//                 'X-API-KEY': ''
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             sendResponse({ success: true, data });
//         })
//         .catch(error => {
//             sendResponse({ success: false, error: error.message });
//         });
//         return true;
//     }
// });


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("request---->",request);
    if (request.action === "analyzeAddresses") {
      const addresses = request.addresses;
      console.log("Addresses------>", addresses);

      const analysisPromises = addresses.map(address => {
        const queryParams = new URLSearchParams({ address });
        return fetch('https://api.honeypot.is/v2/IsHoneypot?' + queryParams, {
            method: 'GET',
            headers: {
                'X-API-KEY': '' 
            }
        })
        .then(response => response.json())
        .then(data => ({ address, result: data }))
        .catch(error => ({ address, error: error.message }));
      });
  

      Promise.all(analysisPromises)
        .then(results => sendResponse({ success: true, results }))
        .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
  });





