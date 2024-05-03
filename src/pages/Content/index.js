import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");


// it check the url correspond address to speciifc url
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && isUniswapUrl(changeInfo.url)) {
      const tokenAddress = extractTokenAddress(changeInfo.url);
      if (tokenAddress) {
        chrome.runtime.sendMessage({ action: "checkToken", tokenAddress: tokenAddress });
      }
    }
  });
  
  function isUniswapUrl(url) {
    return url.includes("app.uniswap.org/explore/tokens/base/");
  }
  
  function extractTokenAddress(url) {
    const regex = /base\/(0x[a-fA-F0-9]{40})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
