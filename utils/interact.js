export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" class="heading mobile">Verifying...</h1>,
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: <div>
            <div class="redirect-section">
                <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" class="heading mobile">VERIFIED!</h1>
                <p class="paragraph">You're eligible for a free hoodie. Click the button below to select your size and complete your redemption.</p>
                
            </div>
            <div class="button-container"><a href="#" class="button-2 w-button">Proceed to Store</a></div>
          </div>,
          };
        } else {
          return {
            address: "",
            status: <div class="redirect-section">
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" class="heading mobile">VERIFY OWNERSHIP</h1>
            <p class="paragraph">The Money Man &#x27;December 24&#x27; hoodie is available for free to anyone that owns a Money Man December 24 NFT with a token ID from 1-303. Qualifying token ownership will be checked using Mintgate. Click below and connect your MetaMask wallet to see if you own a qualifying token.</p>
            
          </div>,
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  

  