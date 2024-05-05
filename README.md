### How to use:

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm run build`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.

HoneyPot Detector Extension
This extension is designed to detect whether a certain token address is affected by a honeypot or not. It provides convenient features for users interacting with Uniswap token websites.

Features:
Automatic Detection on Uniswap: If the user is on a Uniswap token website, they don't need to manually input the token address. The extension will automatically detect it.
Manual Input: If the user is not on a Uniswap site, they can manually paste the token address into our extension's address bar for analysis.
Usage:
Automatic Detection (Uniswap Sites):
When browsing Uniswap token websites, the extension will automatically detect the token address.
Manual Input:
For non-Uniswap sites, users can paste the token address into the extension's address bar and initiate the analysis.
