
// extracting content from json file 
import React, { useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [address, setAddress] = useState('');
  const [apiData, setApiData] = useState(null);
  const [risk, setRisk] = useState('');
  const [riskLevel, setRiskLevel] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [isHoneypot, setIsHoneypot] = useState('');

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Address submitted:', address);
    
    // Send message to background script with the entered address
    chrome.runtime.sendMessage({ action: "callApi", address: address }, function(response) {
      if (response.success) {
        setApiData(response.data);
        // Extracting and setting the required information
        setRisk(response.data.summary.risk);
        setRiskLevel(response.data.summary.riskLevel.toString());
        setTokenName(response.data.token.name);
        setIsHoneypot(response.data.honeypotResult.isHoneypot);
      } else {
        console.error(response.error);
      }
    });
  };

  return (
    <div className="App" style={{textAlign: "center"}} >
      <header className="App-header">
        <h1>HoneyPot Extension</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="address">Smart Contract Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Paste your address here"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
         
         {/* extracted data fro json file */}

        {apiData && (
          <div>
            <h2>Contract Overview</h2>
            {/* <pre>{JSON.stringify(apiData, null, 2)}</pre> */}
            <p>Risk: {risk}</p>
            <p>Risk Level: {riskLevel}</p>
            <p>Token Name: {tokenName}</p>
            <p>Is Honeypot: {isHoneypot ? 'Yes' : 'No'}</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default Popup;

