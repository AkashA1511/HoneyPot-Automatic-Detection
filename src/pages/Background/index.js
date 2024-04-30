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




// de.fi API It check contract address is new or not 
// this scanner API gives risky label for new address 

// console.log('This is the background page.');
// console.log('Here API will work with the content script');

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "callApi") {
//         const queryParams = new URLSearchParams({ address: request.address });
//         fetch('https://public-api.de.fi/graphql' + queryParams, {
//             method: 'GET',
//             headers: {
//                 'X-API-KEY': 'f56cf4c58b8a440c9ec5bbb923105660'
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


  


