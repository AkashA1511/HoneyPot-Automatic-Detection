import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

// const ethereumAddressRegex = /0x[a-fA-F0-9]{40}/g;
// const addresses = Array.from(document.body.innerText.matchAll(ethereumAddressRegex), match => match[0]);

// chrome.runtime.sendMessage({ action: "analyzeAddresses", addresses }, function(response) {
//     console.log('Analysis response:', response);
// });


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && isUniswapUrl(changeInfo.url)) {
      const tokenAddress = extractTokenAddress(changeInfo.url);
      if (tokenAddress) {
        chrome.runtime.sendMessage({ action: "checkToken", tokenAddress: tokenAddress });
      }
    }
  });
  
  function isUniswapUrl(url) {
    return url.includes("wss://app.uniswap.org/explore/tokens/base/");
  }
  
  function extractTokenAddress(url) {
    const regex = /base\/(0x[a-fA-F0-9]{40})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  








