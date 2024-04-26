
// import React, { useState } from 'react';
// import './Popup.css';

// const Popup = () => {
//   // State to track if risk occurred
//   const [riskOccured, setRiskOccured] = useState(false);
//   // State to store the user's address
//   const [address, setAddress] = useState('');

//   const getCurrentTab = async () => {
//     let queryOptions = { active: true, currentWindow: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
//   }

//   const handleRisk = async () => {
//     setRiskOccured(true);
//     const tab = await getCurrentTab();
//     const response = await chrome.tabs.sendMessage(tab.id!, { action: 'This is not affected by honey pot' });
//     console.log(response);
//   };

//   // Handler function to update address state
//   const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setAddress(event.target.value);
//   };

//   // Handler function for form submission
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // Prevent default form submission behavior
//     // Here you can perform any actions with the address, such as sending it to an API
//     console.log('Address submitted:', address);
//   };

// document.addEventListener('DOMContentLoaded', function() {
//   chrome.runtime.sendMessage({ action: "callApi", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" }, function(response) {
//     if (response.success) {
//       console.log(response.data); // Here we can access the data from API 
//     } else {
//       console.error(response.error); // Handle errors form API 
//     }
//   });
// });


//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>HoneyPot Extension </h1>
//         <form onSubmit={handleSubmit}>
//           {/* Input field for the address */}
//           <div>
//             <label htmlFor="address">Smart Contract Address:</label>
//             <input
//               type="text"
//               id="address"
//               value={address}
//               onChange={handleAddressChange}
//               placeholder="Paste your address here"
//               required  // Ensures the input is required
//             />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//         {/* <button onClick={handleRisk}>Trigger Risk</button>
//         {riskOccured && (
//           <div className="popup">
//             <p>HoneyPotted Site </p>
//           </div>
//         )} */}
//       </header>
//     </div>
//   );
// };

// export default Popup;

// import React, { useState, useEffect } from 'react';
// import './Popup.css';

// const Popup = () => {
//   const [address, setAddress] = useState('');
//   const [apiData, setApiData] = useState(null);

//   // address : 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 

//   // change to address : quickcheckAPI 

//   useEffect(() => {
//     chrome.runtime.sendMessage({ action: "callApi", address: "0x5e856bd39dd668c9e8f55c84e7362791a3aba94a" }, function(response) {
//       if (response.success) {
//         setApiData(response.data);
//       } else {
//         console.error(response.error,'Akash');
//       }
//     });
//   }, []);

//   // const handleAddressChange = (event) => {
//   //   setAddress(event.target.value);
//   // };

//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   console.log('Address submitted:', address);
//   // };

//   const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setAddress(event.target.value);
//   };
  
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log('Address submitted:', address);
//   };
  

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>HoneyPot Extension</h1>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="address">Smart Contract Address:</label>
//             <input
//               type="text"
//               id="address"
//               value={address}
//               onChange={handleAddressChange}
//               placeholder="Paste your address here"
//               required
//             />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//         {apiData && (
//           <div>
//             <h2>API Response:</h2>
//             <pre>{JSON.stringify(apiData, null, 2)}</pre>
//           </div>
//         )}
//       </header>
//       console.log(address);
//     </div>
//   );
// };

// export default Popup;


// popup.tsx

import React, { useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [address, setAddress] = useState('');
  const [apiData, setApiData] = useState(null);

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
      } else {

        // console.error("Error---->",response);
        console.error(response.error);
      }
    });
  };

  return (
    <div className="App">
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
        {apiData && (
          <div>
            <h2>API Response:</h2>
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
};

export default Popup;

