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

# HoneyPot Detector Extension

This extension helps users determine if a specific token address is associated with a honeypot. It offers seamless functionality for users browsing Uniswap token websites. If users are on a Uniswap site, they won't need to manually input the token address as the extension automatically detects it. For users on other websites, they can simply paste the token address into the extension's address bar for analysis.
