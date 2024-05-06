
// working on both but in uniswap we are directly putting that address in address bar
import React, { useState, useEffect } from 'react';
import './Popup.css';
import './tailwind.css';

const Popup = () => {
  const [address, setAddress] = useState('');
  const [apiData, setApiData] = useState(null);
  const [risk, setRisk] = useState('');
  const [riskLevel, setRiskLevel] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [isHoneypot, setIsHoneypot] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (address.trim() !== '') {
      checkHoneypot(address);
    } else {
      console.log("Please enter a valid address.");
    }
  };

  const checkHoneypot = (address) => {
    chrome.runtime.sendMessage({ action: "checkToken", tokenAddress: address }, function(response) {
      if (response.success) {
        setApiData(response.data);
        if (response.data.summary) {
          setRisk(response.data.summary.risk || '');
          setRiskLevel(response.data.summary.riskLevel.toString() || '');
        }
        setTokenName(response.data.token.name || '');
        setIsHoneypot(response.data.honeypotResult.isHoneypot || false);
      } else {
        console.error(response.error);
      }
    });
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url && isUniswapUrl(currentTab.url)) {
        const tokenAddress = extractTokenAddress(currentTab.url);
        if (tokenAddress) {
          setAddress(tokenAddress);
          checkHoneypot(tokenAddress);
        }
      }
    });
  }, []);

  // const isUniswapUrl = (url) => {
  //   return url.includes("app.uniswap.org/explore/tokens/base/") || url.includes("app.uniswap.org/explore/tokens/ethereum/") || url.includes("etherscan.io/token/") || url.includes("bscscan.com/token/");
  // };


  const isUniswapUrl = (url) => {
  const prefixes = [
    "app.uniswap.org/explore/tokens/base/",
    "app.uniswap.org/explore/tokens/ethereum/",
    "etherscan.io/token/",
    "bscscan.com/token/",
    "blastscan.io/token/"
  ];

  return prefixes.some(prefix => url.includes(prefix));
};


  const extractTokenAddress = (url) => {
    const regex = /(0x[a-fA-F0-9]{40})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <header className="App-header">
      {/* <div className="shine">Honeypot Extension</div> */}
        <h1 className="">HoneyPot Extension</h1>
        <form onSubmit={handleSubmit}>
          <div>
            {/* <label htmlFor="address">Enter Token Address:</label> */}
            <input
              type="text"
              id="address"
              className="input"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter Token address"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        {/* Display the token information */}
        {/* {apiData && (
          <div>
            <h2>Contract Overview</h2>
            <p>Risk: {risk}</p>
            <p>Risk Level: {riskLevel}</p>
            <p>Token Name: {tokenName}</p>
            <p style={{ color: isHoneypot? 'red' : 'green' ,fontWeight: 'bold',}}>Is Honeypot: {isHoneypot ? 'Yes' : 'No'}</p>
          </div>
        )} */}

        {apiData && (
          <div className="contract-overview">
            <h2>Contract Overview</h2>
            <div className="overview-item">
              <span className="label">Risk:</span>
              <span className={`value ${isHoneypot ? 'risk-high' : 'risk-low'}`}>{risk}</span>
            </div>
            <div className="overview-item">
              <span className="label">Risk Level:</span>
              <span className="value">{riskLevel}</span>
            </div>
            <div className="overview-item">
              <span className="label">Token Name:</span>
              <span className="value">{tokenName}</span>
            </div>
            <div className="overview-item">
              <span className="label">Honeypot:</span>
              <span className={`value ${isHoneypot ? 'risk-high' : 'risk-low'}`}>{isHoneypot ? 'Yes' : 'No'}</span>
            </div>
          </div>
        )}


      </header>
    </div>
  );
};

export default Popup;


