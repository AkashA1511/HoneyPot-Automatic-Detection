import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

const ethereumAddressRegex = /0x[a-fA-F0-9]{40}/g;
const addresses = Array.from(document.body.innerText.matchAll(ethereumAddressRegex), match => match[0]);


chrome.runtime.sendMessage({ action: "analyzeAddresses", addresses }, function(response) {
    console.log('Analysis response:', response);
});




