
import { useEffect, useState } from "react";

 import { Alchemy, Network } from 'alchemy-sdk';

 import env from "react-dotenv";
 import { isMobile } from 'react-device-detect';
 //import { ethers } from "ethers";
 import XLProductForm from './xl-product-form';
 import LProductForm from './large-product-form';
 import MProductForm from './m-product-form';
import XLDATA from './XL';
import LDATA from './L';
import MDATA from './M';
import MJSONDATA from './MDATA'
import LJSONDATA from './LDATA'
import XLJSONDATA from './XLData'

import DynamoDB from 'aws-sdk/clients/dynamodb';
require('dotenv').config();


const dbb = new DynamoDB({accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY, region: 'us-west-2'});



 
 


    



const apiKey = process.env.REACT_APP_TOKEN_APIKEY;


const Minter = (props) => {

//State variables
const [walletAddress, setWallet] = useState("");
const [status, setStatus] = useState("");
const [month, setMonth] = useState("");
const [day, setDay] = useState("");
const [year, setYear] = useState("");
const [validWallet, setValidWallet] = useState("");
const [maintokenID, setMainTokenID] = useState("");

var ageMonth = "";
var ageDay = "";
var ageYear = "";

 var burnID = "";
 

 var browser = "";
 if(isMobile){
   var browser = "TRUE";
 }
 else{
   var browser = "FALSE";
 }
 
 //https://eth-mainnet.alchemyapi.io/v2/${apiKey} eth-goerli.
//  const web3 = createAlchemyWeb3(
//    `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
//  );
 const config = {
  apiKey: apiKey,
  network: Network.ETH_MAINNET,
};

 const web3 = new Alchemy(config);

 useEffect(() => {
   // wrap your async call here
   const loadData = async () => { 

     //buildAgeForm();
     
     console.log("JSON DATA FROM DOC: "+XLDATA.indexOf("0x064c2725b6e3450d7b3aad53230a34eb1342327a"));
     if (XLDATA.indexOf("0x064c2725b6e3450d7b3aad53230a34eb1342327a") != -1 && XLDATA.indexOf("0x064c2725b6e3450d7b3aad53230a34eb1342327a") != undefined && XLDATA.indexOf("0x064c2725b6e3450d7b3aad53230a34eb1342327a") != null){
      console.log("FOUND WALLET ADDRESS ");
     }
     else{
      console.log("NOT FOUND")
     }
     
     console.log("PROCESS: "+ process.env.REACT_APP_AWS_SECRET_ACCESS_KEY + " STRINGIFY: " + JSON.stringify(process) );
       const {address, status} = await getCurrentWalletConnected();
       setWallet(address)
       setStatus(status); 
       console.log("FOUND WALLET ADDRESS: "+address);
      
       addWalletListener();
     
     };

  // then call it here
  loadData();
}, []);





const connectWalletPressed = async () => { 
  const walletResponse = await connectWallet();
  setStatus(walletResponse.status);
  setWallet(walletResponse.address);

  verifyWallet();

};



const tryGetJson = async (resp) => {
  return new Promise((resolve) => {
    if (resp) {
      resp.json().then(json => resolve(json)).catch(() => resolve(null))
    } else {
      resolve(null)
    }
  })
}

 const connectWallet = async () => {
   if (window.ethereum) {
    console.log("FOUND ETH");
     try {
       const addressArray = await window.ethereum.request({
         method: "eth_requestAccounts",
       });
       const obj = {
         status: <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Verifying...</h1>,
         address: addressArray[0],
       };
       
       return obj;
     } catch (err) {
       return {
         address: "",
         status: "😥 " + JSON.stringify(err.message),
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
             <a target="_blank" style="color: white !important;" href={`https://metamask.io/download.html`}>
               You must install Metamask, a virtual Ethereum wallet, in your
               browser.
             </a>
           </p>
         </span>
       ),
     };
   }
 };

 const getCurrentWalletConnected = async () => {
  try{
   if (window.ethereum) {
    console.log("FOUND ETH");
     try {
       const addressArray = await window.ethereum.request({
         method: "eth_accounts",
       });
       if (addressArray.length > 0) {

       
        return {
          address: addressArray[0],
          status:  <div className="redirect-section landing-block">
          {/* <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Claim Closed</h1> */}
                               <p className="paragraph">Owners of a Kith Friend™ Edition M-XL are eligible to claim their respective Product Bundles. Please click the button below to connect your MetaMask wallet to begin the claiming process.</p>
             
                              <button id="walletButton" onClick={connectWalletPressed}>
                                  {walletAddress.length > 0 ? (
                                    "Connected: " +
                                    String(walletAddress).substring(0, 6) +
                                    "..." +
                                    String(walletAddress).substring(38)
                                  ) : (
                                    <span>Connect</span>
                                  )}
                                </button> 
       
                                {/* <a id="walletButton" className="token-checker-btn" onClick={tokenChecker}>Check a token</a> */}
                             
                           
            
        </div>,
         };
         
         

      } else {
        return {
          address: "",
          status:  <div className="redirect-section landing-block">
   
   

          {/* <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Claim Closed</h1> */}
                               <p className="paragraph">Owners of a Kith Friend™ Edition M-XL are eligible to claim their respective Product Bundles. Please click the button below to connect your MetaMask wallet to begin the claiming process.</p>
             
                              <button id="walletButton" onClick={connectWalletPressed}>
                                  {walletAddress.length > 0 ? (
                                    "Connected: " +
                                    String(walletAddress).substring(0, 6) +
                                    "..." +
                                    String(walletAddress).substring(38)
                                  ) : (
                                    <span>Connect</span>
                                  )}
                                </button>
       
                                {/* <a id="walletButton" className="token-checker-btn" onClick={tokenChecker}>Check a token</a> */}
                             
                           
            
        </div>,
         };
       }
     } catch (err) {
       return {
         address: "",
         status: "😥 " + JSON.stringify(err.message),
       };
     }
   } else {
       if(isMobile){
         return {
           address: "",
           status: (
             <div className="redirect-section">
               <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Browsing on mobile?</h1>
               <p className="paragraph">Click the button below to open this webpage in the Metamask Browser</p>
               <a id="walletButton" href="https://metamask.app.link/dapp/verify.kith.com/" >
                   Open in Metamask
                 </a>
             </div>
           ),
         };
       }
       else{
         return {
           address: "",
           status: (
             <div className="redirect-section">
               <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">No Metamask extension found</h1>
               <p className="paragraph">Click the button below to download Metamask to supporting browsers</p>
               <a id="walletButton" href="https://metamask.io/download.html" >
                   Download Metamask
                 </a>
             </div>
           ),
         };
       }
     }
    }
    catch(err){
      console.log(err);
    }
 };

const onMintPressed = async () => { //TODO: implement
  
};



const verifyWallet = async () => {
  const {address, status} = await getCurrentWalletConnected();

  //const address = "0x4b71079255380b32b52c7ea962d384bf89e6c106";
  

   //console.log(" Address: "+address.length);
   try {
   if ( address.length == 0 ){
     
     setWallet("");
         setStatus(
          <div className="redirect-section landing-block">
   
   

          {/* <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Claim Closed</h1> */}
                               <p className="paragraph">Owners of a Kith Friend™ Edition M-XL are eligible to claim their respective Product Bundles. Please click the button below to connect your MetaMask wallet to begin the claiming process.</p>
             
                              <button id="walletButton" onClick={connectWalletPressed}>
                                  {walletAddress.length > 0 ? (
                                    "Connected: " +
                                    String(walletAddress).substring(0, 6) +
                                    "..." +
                                    String(walletAddress).substring(38)
                                  ) : (
                                    <span>Connect</span>
                                  )}
                                </button>
       
                                {/* <a id="walletButton" className="token-checker-btn" onClick={tokenChecker}>Check a token</a> */}
                             
                           
            
        </div>
       );
       return false;
   }
   
   else{
  
  
   
   
   const nfts = await web3.nft.getNftsForOwner(address,{
    contractAddresses: ["0x130cfab3817467f532c179d4e6502f5a7e7d44c7"]
  });

    var foundNFT = false;
    var foundXLNFT = false;
    var foundLNFT = false;
    var foundMNFT = false;
  


 

   var tokens = [];

  // // Print contract address and tokenId for each NFT:
  for (const nft of nfts.ownedNfts) {
    


     if ( nft.contract.address == "0x130cfab3817467f532c179d4e6502f5a7e7d44c7"){
      console.log("FOUND: ++ "+nft);
      if (nft.tokenId == 12 ){
       
       //retString = retString + "FOUND NFT";
       foundNFT = true;
       tokens.push(nft);
       foundXLNFT = true;

      }
      if (nft.tokenId == 11 ){
       
        //retString = retString + "FOUND NFT";
        foundNFT = true;
        tokens.push(nft);
        foundLNFT = true;
 
       }
       if (nft.tokenId == 10 ){
       
        //retString = retString + "FOUND NFT";
        foundNFT = true;
        tokens.push(nft);
        foundMNFT = true;
 
       }
     }
     
    

 }
 if( address == "0x2231b0188dad7349695dc84b8fe5d1bee5e79cfe" || address == "0xbf81e7d83fdf15d51911baf4b767b7d2fd4aa805" || address == "0x9cd201f0b41200a04967fd253abbd3b076a1fcd0"){
  foundNFT = true;
  foundXLNFT = true;
  foundLNFT = true;
  foundMNFT = true;
 }

  var foundXL = false;
  var foundL = false; 
  var foundM = false;

  if(XLDATA.indexOf(address) != -1 && XLDATA.indexOf(address) != undefined && XLDATA.indexOf(address) != null){
    foundXL = true;

  }
  if(LDATA.indexOf(address) != -1 && LDATA.indexOf(address) != undefined && LDATA.indexOf(address) != null){
    foundL = true;

  }
  if(MDATA.indexOf(address) != -1 && MDATA.indexOf(address) != undefined && MDATA.indexOf(address) != null){
    foundM = true;

  }




  
 if(foundNFT == true){
  if(foundXL == true || foundL == true || foundM == true){
 
     
    allowWallet();

    const list = document.createElement("div");
     list.classList.add('nfts-parent');
     
     
       
       
        if(foundXLNFT == true && XLDATA.indexOf(address) != -1 && XLDATA.indexOf(address) != undefined && XLDATA.indexOf(address) != null ){
          var XLObjectData = await XLJSONDATA.find(o => o.walletAddress === address);
      
          var XLquantity = XLObjectData.quantity;
          
          var params = {
            TableName: 'Orders',
            FilterExpression: "walletAddress = :walletAddress and tokenID = :tokenID",
          // Define the expression attribute value, which are substitutes for the values you want to compare.
          ExpressionAttributeNames: {
            "#WA": "walletAddress",
            "#T": "tokenID"
            },
          ExpressionAttributeValues: {
            ":walletAddress": {S: address},
            ":tokenID": {S: "12"}
          },
          // Set the projection expression, which are the attributes that you want.
          ProjectionExpression: "#WA, #T"
            
          };
            
            
                
                  let child = document.createElement("div");
                  child.classList.add('nft-child');
                  let imageParent = document.createElement("div");
                  imageParent.classList.add('imageParent');
                  let image = document.createElement("img");
                  
                    image.src = "Kith-XL.gif"
                  
                  
                  image.classList.add('nft-image');
                  imageParent.appendChild(image);
                  let title = document.createElement("h3");
                  title.classList.add('nft-title');
                  
                    title.innerText = "Kith Friend™ Edition XL";
                  
                
                  
                  

                  let claimedParent = document.createElement("div");
                  claimedParent.classList.add('claimed-state');
                  let claimable = document.createElement("p");
                  claimable.classList.add('paragraph');
                  claimable.classList.add('quantity');
                  let quant = XLquantity - 0;
                  claimable.innerText = quant + " CLAIMABLE";

                  let spacer = document.createElement("p");
                  spacer.classList.add('paragraph');
                  spacer.classList.add('spacer');
                  spacer.innerText = "|";
                  let claimed = document.createElement("p");
                  claimed.classList.add('paragraph');
                  claimed.classList.add('claimed');
                  claimed.innerText = 0 + " CLAIMED";
          

                  claimedParent.appendChild(claimable);
                  claimedParent.appendChild(spacer);
                  claimedParent.appendChild(claimed);

                  let buttonParent = document.createElement("div");
                  buttonParent.classList.add('buttonParent');
                  let button = document.createElement("button");
                  button.classList.add('nft-button');
                  
                  if(XLquantity > 0 ){
                    button.innerText = "CLAIM BUNDLE";
                    button.addEventListener("click", function() {
                      xlProduct({"owned": XLquantity, "claimed": 0, "UUID": XLObjectData.UUID, "address": address});
                    });
                    
                  }
                  else{
                    button.innerText = "CLAIMED";
                    button.disabled = true; 
                  }
                  buttonParent.appendChild(button);
                  child.appendChild(imageParent);
                  child.appendChild(title);
                  child.appendChild(buttonParent);
                  child.appendChild(claimedParent);
                  list.appendChild(child);
                
             
       }
       if(foundLNFT == true && LDATA.indexOf(address) != -1 && LDATA.indexOf(address) != undefined && LDATA.indexOf(address) != null ){
        var LObjectData = await LJSONDATA.find(o => o.walletAddress === address);
      
      var Lquantity = LObjectData.quantity;
          
        var params = {
          TableName: 'Orders',
          FilterExpression: "walletAddress = :walletAddress and tokenID = :tokenID",
        // Define the expression attribute value, which are substitutes for the values you want to compare.
        ExpressionAttributeNames: {
          "#WA": "walletAddress",
          "#T": "tokenID"
          },
        ExpressionAttributeValues: {
          ":walletAddress": {S: address},
          ":tokenID": {S: "11"}
        },
        // Set the projection expression, which are the attributes that you want.
        ProjectionExpression: "#WA, #T"
          
        };
          
 
              
              
                let child = document.createElement("div");
                child.classList.add('nft-child');
                let imageParent = document.createElement("div");
                imageParent.classList.add('imageParent');
                let image = document.createElement("img");
                
                  image.src = "Kith-L.gif"
                
                
                image.classList.add('nft-image');
                imageParent.appendChild(image);
                let title = document.createElement("h3");
                title.classList.add('nft-title');
                
                  title.innerText = "Kith Friend™ Edition L";
                
                
                

                let claimedParent = document.createElement("div");
                claimedParent.classList.add('claimed-state');
                let claimable = document.createElement("p");
                claimable.classList.add('paragraph');
                claimable.classList.add('quantity');
                let quant = Lquantity - 0;
                claimable.innerText = quant + " CLAIMABLE";

                let spacer = document.createElement("p");
                spacer.classList.add('paragraph');
                spacer.classList.add('spacer');
                spacer.innerText = "|";
                let claimed = document.createElement("p");
                claimed.classList.add('paragraph');
                claimed.classList.add('claimed');
                claimed.innerText = 0 + " CLAIMED";
        

                claimedParent.appendChild(claimable);
                claimedParent.appendChild(spacer);
                claimedParent.appendChild(claimed);

                let buttonParent = document.createElement("div");
                buttonParent.classList.add('buttonParent');
                let button = document.createElement("button");
                button.classList.add('nft-button');
                
                if(Lquantity > 0 ){
                  button.innerText = "CLAIM BUNDLE";
                  button.addEventListener("click", function() {
                    lProduct({"owned": Lquantity, "claimed": 0, "UUID": LObjectData.UUID, "address": address});
                  });
                  
                }
                else{
                  button.innerText = "CLAIMED";
                  button.disabled = true; 
                }
                buttonParent.appendChild(button);
                child.appendChild(imageParent);
                child.appendChild(title);
                child.appendChild(buttonParent);
                child.appendChild(claimedParent);
                list.appendChild(child);
              
       
       
     }
     if(foundMNFT == true && MDATA.indexOf(address) != -1 && MDATA.indexOf(address) != undefined && MDATA.indexOf(address) != null ){
  
      var MObjectData = await MJSONDATA.find(o => o.walletAddress === address);
      var quantity = MObjectData.quantity;
      

      var params = {
        TableName: 'Orders',
        FilterExpression: "walletAddress = :walletAddress and tokenID = :tokenID",
      // Define the expression attribute value, which are substitutes for the values you want to compare.
      ExpressionAttributeNames: {
        "#WA": "walletAddress",
        "#T": "tokenID"
        },
      ExpressionAttributeValues: {
        ":walletAddress": {S: address},
        ":tokenID": {S: "10"}
      },
      // Set the projection expression, which are the attributes that you want.
      ProjectionExpression: "#WA, #T"
        
      };
        
       
            
            
              let child = document.createElement("div");
              child.classList.add('nft-child');
              let imageParent = document.createElement("div");
              imageParent.classList.add('imageParent');
              let image = document.createElement("img");
              
                image.src = "Kith-M.gif"
              
              image.classList.add('nft-image');
              imageParent.appendChild(image);
              let title = document.createElement("h3");
              title.classList.add('nft-title');
              
                title.innerText = "Kith Friend™ Edition M";
              
              
              

              let claimedParent = document.createElement("div");
              claimedParent.classList.add('claimed-state');
              let claimable = document.createElement("p");
              claimable.classList.add('paragraph');
              claimable.classList.add('quantity');
              let quant = quantity - 0;
              claimable.innerText = quant + " CLAIMABLE";

              let spacer = document.createElement("p");
              spacer.classList.add('paragraph');
              spacer.classList.add('spacer');
              spacer.innerText = "|";
              let claimed = document.createElement("p");
              claimed.classList.add('paragraph');
              claimed.classList.add('claimed');
              claimed.innerText = 0 + " CLAIMED";
      

              claimedParent.appendChild(claimable);
              claimedParent.appendChild(spacer);
              claimedParent.appendChild(claimed);

              let buttonParent = document.createElement("div");
              buttonParent.classList.add('buttonParent');
              let button = document.createElement("button");
              button.classList.add('nft-button');
              
              if(quantity > 0 ){
                button.innerText = "CLAIM BUNDLE";
                button.addEventListener("click", function() {
                  mProduct({"owned": quantity, "claimed": 0, "UUID": MObjectData.UUID, "address": address});
                });
                
              }
              else{
                button.innerText = "CLAIMED";
                button.disabled = true; 
              }
              buttonParent.appendChild(button);
              child.appendChild(imageParent);
              child.appendChild(title);
              child.appendChild(buttonParent);
              child.appendChild(claimedParent);
              list.appendChild(child);
            
       

   }
     
    
    let parent = document.getElementById("nfts-container");
    parent.innerHTML = "";
    parent.appendChild(list);
    
   
  
    
  }
}
  else{
    denyWallet();

  }

   return foundNFT;
  
}
 }catch(err){
  console.log(err);
}
 }


 

 const handleAgeSubmit = async (event) => {
   event.preventDefault();
   var date = new Date();
   
   var old = "false";

   if( Number(event.target[2].value) >= 2001){
     if (Number(event.target[2].value) == 2001){
       if(Number(event.target[0].value)-1 >= date.getMonth()){
         if(Number(event.target[0].value)-1 == date.getMonth()){
           if(Number(event.target[1].value) >= date.getDate()){
             if(Number(event.target[1].value) == date.getDate()){
               old = "true";
             }
           }
           else{
             old = "true";
           }
         }
       }
       else{
         old = "true";
       }
     }
   }
   else{
       old = "true";
   }
   if (event.target[2].value == "" || event.target[1].value == "" || event.target[0].value == ""){
     old = "false";
   }

  if(old == "true"){
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address)
      setStatus(status); 
  
     
      addWalletListener();
  }
}

function buildAgeForm(){
  
  setStatus(
    <div>
        <h1 className="age-form">YOU MUST BE OF LEGAL DRINKING<br></br>AGE TO ENTER THIS SITE</h1>
        
        <form className="age-form" onSubmit={handleAgeSubmit}>
        
            <div className='age-form-imput-parent'>
                <input 
                type="number"
                className='month-input'
                name={"month"}
                placeholder={"MM"}

                />
                <input 
                type="number"
                className='day-input'
                name={"day"}
                placeholder={"DD"}

                />
                <input 
                type="number"
                className='year-input'
                name={"year"}
                placeholder={"YY"}

                />
                <button className="age-button" type="submit" >ENTER</button>
            </div>
            
            
        </form>
    </div>
); 
}



function tokenChecker(){
 setStatus(
   <div className="verified-parent">
    <div className="redirect-section">
          <div className="text-parent-checker">
          <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">TOKEN CHECKER</h1>
           <p className="paragraph">Enter a token ID to verify if it is eligible for the claimable merch kit</p>
          </div>
          <div className="checker-form">
           <div className="input-parent-checker"><input type="text" className="token-checker-input" placeholder="Enter token ID"></input></div>
           <button id="walletButton" className="checker-btn" onClick={checking} >SUBMIT</button>
          </div>
          <div className="token-check-parent">
               <a className="token-checker-btn" onClick={home}>Continue to claim</a>
             </div>
          
      </div>
   </div>
  );
}

function checking(){
 var toCheck = document.getElementsByClassName("token-checker-input")[0];

  var params = {
    TableName: 'Short-IDs',
    Key: {
      'Short-ID': {S: toCheck.value}
    }
    
  };
  
  // Call DynamoDB to read the item from the table
  dbb.getItem(params, function(err, data) {
    if (err) {
      
    } else {
      
      if(data.Item == undefined){
        
        setStatus(
          <div className="verified-parent">
           <div className="redirect-section">
                 <div className="text-parent-checker">
                 <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">TOKEN CHECKER</h1>
                  <p className="paragraph">Enter a token ID to verify if it is eligible for the claimable merch kit</p>
                 </div>
                 <div className="response-block">
                  
                 <p className="paragraph response-text">Token ID entered is <span className="isvalid">eligible</span> to claim!</p>
                 </div>
                 
                 <div className="token-check-parent">
                      <a className="token-checker-btn" onClick={home}>Continue to claim</a>
                    </div>
                 
             </div>
          </div>
         );
      }
      else{
        
        setStatus(
          <div className="verified-parent">
           <div className="redirect-section">
                 <div className="text-parent-checker">
                 <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">TOKEN CHECKER</h1>
                    <p className="paragraph">Enter a token ID to verify if it is eligible for the claimable merch kit</p>
                 </div>
                 <div className="response-block">
                  <p className="paragraph response-text">Token ID entered is <span className="invalid">not eligible</span> to claim!</p>
                  
                 </div>
                 
                 <div className="token-check-parent">
                      <a className="token-checker-btn" onClick={home}>Continue to claim</a>
                    </div>
                 
             </div>
          </div>
         );
      }
    }
  });
 
  

}

function home(){
 setStatus(
   <div className="redirect-section landing-block">
   
   

  {/* <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Claim Closed</h1> */}
                         <p className="paragraph">Owners of a Kith Friend™ Edition M-XL are eligible to claim their respective Product Bundles. Please click the button below to connect your MetaMask wallet to begin the claiming process.</p>
      
                       <button id="walletButton" onClick={connectWalletPressed}>
                           {walletAddress.length > 0 ? (
                             "Connected: " +
                             String(walletAddress).substring(0, 6) +
                             "..." +
                             String(walletAddress).substring(38)
                           ) : (
                             <span>Connect</span>
                           )}
                         </button> 

                         {/* <a id="walletButton" className="token-checker-btn" onClick={tokenChecker}>Check a token</a> */}
                      
                    
     
 </div>
 );
}

 async function xlProduct(data){
  const {address, status} = await getCurrentWalletConnected();


console.log("OWNED: "+data.owned+ " CLAIMED: "+data.claimed);
var canClaim = data.owned - data.claimed;
window.scrollTo({ top: 0, behavior: 'smooth' });
     setStatus(
       <div  className="verified-parent">
       <div className="redirect-section">
             
             <div className="product-container">
               <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile product-claim">Claim Your Bundle</h1>
               <div className="split-parent">
                 <div className="split-child">
                 
                     <img src="Kith-XL.gif" loading="lazy" alt="" className="promo-image"></img>
                 </div>
                 <div className="split-child">
                   <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile product title-product third">Kith Friend™ Edition XL</h1>
                   <div className="claimed-state"><p className="paragraph quantity">{canClaim} CLAIMABLE TOKENS</p><p className="paragraph spacer product-pg">|</p><p className="paragraph claimed">{data.claimed} CLAIMED TOKENS</p></div>
                   <p className="paragraph description">Holders of this edition will receive pieces from the Kith for Invisible Friend collection. A balck wool bomber jacket, black crewneck, bucket hat and a pair of Ronnie Fieg for Asics (sizes 5-14).</p>
                   
                     <XLProductForm tokenid={burnID} dynamodb={dbb} sizeChart={toggleSizeChart} uuid={data.UUID} wallet={address} error={errorFunction}></XLProductForm> 
                 </div>
               </div> 
           </div>
           
           
         </div>
     </div>
     );

}
async function lProduct(data){
  const {address, status} = await getCurrentWalletConnected();
 const owner = await web3.nft.getNftsForOwner("0x130cfab3817467f532c179d4e6502f5a7e7d44c7", {
  contractAddresses: ["0x130cfab3817467f532c179d4e6502f5a7e7d44c7"]
});



var canClaim = data.owned - data.claimed;
window.scrollTo({ top: 0, behavior: 'smooth' });
     setStatus(
       <div  className="verified-parent">
       <div className="redirect-section">
             
             <div className="product-container">
               <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile product-claim">Claim Your Bundle</h1>
               <div className="split-parent">
                 <div className="split-child">
                 
                     <img src="Kith-L.gif" loading="lazy" alt="" className="promo-image"></img>
                 </div>
                 <div className="split-child">
                   <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile product title-product third">Kith Friend™ Edition L</h1>
                   <div className="claimed-state"><p className="paragraph quantity">{canClaim} CLAIMABLE TOKENS</p><p className="paragraph spacer product-pg">|</p><p className="paragraph claimed">{data.claimed} CLAIMED TOKENS</p></div>
                   <p className="paragraph description">Holders of this edition will receive pieces from the Kith for Invisible Friend collection. A cream wool bomber jacket, navy crewneck, cap and a pair of Ronnie Fieg for Asics (sizes 5-14). Note that this footwear will ship separately (at no additional cost) in March.</p>

                     <LProductForm tokenid={burnID} dynamodb={dbb} sizeChart={toggleSizeChart} uuid={data.UUID} wallet={address} error={errorFunction}></LProductForm> 
                 </div>
               </div> 
           </div>
           
           
         </div>
     </div>
     );

}
async function mProduct(data){
  const {address, status} = await getCurrentWalletConnected();
 const owner = await web3.nft.getNftsForOwner("0x130cfab3817467f532c179d4e6502f5a7e7d44c7", {
  contractAddresses: ["0x130cfab3817467f532c179d4e6502f5a7e7d44c7"]
});



var canClaim = data.owned - data.claimed;
window.scrollTo({ top: 0, behavior: 'smooth' });
     setStatus(
       <div  className="verified-parent">
       <div className="redirect-section">
             
             <div className="product-container">
               <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile product-claim">Claim Your Bundle</h1>
               <div className="split-parent">
                 <div className="split-child">
                 
                     <img src="Kith-M.gif" loading="lazy" alt="" className="promo-image"></img>
                 </div>
                 <div className="split-child">
                   <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile product title-product third">Kith Friend™ Edition M</h1>
                   <div className="claimed-state"><p className="paragraph quantity">{canClaim} CLAIMABLE TOKENS</p><p className="paragraph spacer product-pg">|</p><p className="paragraph claimed">{data.claimed} CLAIMED TOKENS</p></div>
                   <p className="paragraph description">Holders of this edition will receive pieces from the Kith for Invisible Friend collection. A blue wool bomber jacket, white crewneck, beanie and a pair of Ronnie Fieg for Asics (sizes 5-14). Note that this footwear will ship separately (at no additional cost) in December.</p>
                     <MProductForm tokenid={burnID} dynamodb={dbb} sizeChart={toggleSizeChart} uuid={data.UUID} wallet={address} error={errorFunction}></MProductForm> 
                 </div>
               </div> 
           </div>
           
           
         </div>
     </div>
     );

}



 async function productThird() {
  const {address, status} = await getCurrentWalletConnected();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setStatus(
    <div  className="verified-parent">
     <div className="redirect-section">
           <div>
            <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile product">IN YOUR KIT</h1>
            <p className="product-container-label">PRODUCT <span> 3 </span> OF <span> 3</span></p>
           </div>
           <div className="product-container">
             <div className="split-parent">
               <div className="split-child">
               <video src="https://cdn.shopify.com/videos/c/o/v/40607bb99bc44ce4899339ed7d65191d.mp4" width="320" height="240" autoPlay={true} loop={true} controls={false} playsInline={true} />
               </div>
               <div className="split-child">
                 <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile product title-product third">adidas WAGMI<br></br>United Football Jersey</h1>
                 <p className="sub-heading">Free to claim, just pay shipping & duties (if applicable)</p>
                 <p className="paragraph description">Created for high performance, this adidas Condivo 22 jersey is all about comfortable movement.  It's ventilating mesh side panels keep you cool while you are performing.  Working hard to wick moisture from your skin, AEROREADY ensures you're always ready for more. Made with 100% recycled materials, this product represents just one of our solutions to help end plastic waste.<br></br><br></br>Details:<br></br>• Slim fit<br></br>• Ribbed V-neck<br></br>• 100% recycled polyester<br></br>• Moisture-absorbing AEROREADY<br></br>• Imported</p>
               <XLProductForm tokenid={burnID} dynamodb={dbb} sizeChart={toggleSizeChart} wallet={address} error={errorFunction}></XLProductForm> 
               </div>
             </div> 
         </div>
         <div id="size-chart-target" className="sizechart-parent hidden" onClick={closeSizeChart}>
         <div className="size-parent-container">
          <div className="modal-size-chart">
              <h1>Size Chart</h1>
              <div className="table">
                <div className="table-row">
                  <div className="table-cell first">Size</div>
                  <div className="table-cell">Chest (in.)</div>
                  <div className="table-cell">Waist (in.)</div>
                  <div className="table-cell">Hip (in.)</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">XS</div>
                  <div className="table-cell">32.5 - 34</div>
                  <div className="table-cell">27.5 - 29</div>
                  <div className="table-cell">32 - 33.5</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">S</div>
                  <div className="table-cell">34.5 - 36</div>
                  <div className="table-cell">29.5 - 31.5</div>
                  <div className="table-cell">34 - 36</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">M</div>
                  <div className="table-cell">36.5 - 39</div>
                  <div className="table-cell">32 - 34.5</div>
                  <div className="table-cell">36.5 - 39</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">L</div>
                  <div className="table-cell">39.5 - 42.5</div>
                  <div className="table-cell">35 - 38</div>
                  <div className="table-cell">39.5 - 42</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">XL</div>
                  <div className="table-cell">43 - 46.5</div>
                  <div className="table-cell">38.5 - 42</div>
                  <div className="table-cell">42.5 - 45.5</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">2XL</div>
                  <div className="table-cell">47 - 51</div>
                  <div className="table-cell">42.5 - 47</div>
                  <div className="table-cell">46 - 49</div>
                </div>
                <div className="table-row">
                  <div className="table-cell first">3XL</div>
                  <div className="table-cell">51.5 - 56</div>
                  <div className="table-cell">47.5 - 52</div>
                  <div className="table-cell">49.5 - 53</div>
                </div>
              </div>
            </div>
            <div className="close">x</div>
          </div>

        </div>
        
      </div>
   </div>
  );
}

 function toggleSizeChart() {
    var target = document.getElementById("size-chart-target");
    if(target.classList.contains("hidden")){
      target.classList.remove("hidden");
    }
    
 }
 function closeSizeChart() {
  var target = document.getElementById("size-chart-target");
  if(target.classList.contains("hidden")){
    
  }
  else{
    target.classList.add("hidden");
  }
}

 function errorFunction(){
   setStatus(
     <div className="redirect-section">
           <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Error!</h1>
           <p className="paragraph">There was an error verifying that you own this token</p>      
       </div>
   );
 }
 function successFunction(){
   setStatus(
     <div className="redirect-section">
           <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">REDEEM</h1>
             <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile connect">SUCCESS</h1>
           <p className="paragraph">Thanks for redeeming your Budweiser World Cup Starter Kit! You will receive a confirmation email shortly with details.</p>
           
       </div>
   );
 }



const sendOrder = async () => {
   fetch('https://hooks.zapier.com/hooks/catch/5494090/beccz65/', {
       method: 'POST',
       body: JSON.stringify({
           "order":{"line_items":[{"variant_id":39986963742884,"product_id":6729147187364,"name":"Test Tee 1","quantity":1}],"customer":{"first_name":"Josh","last_name":"Maldonado","email":"joshm@topdrawermerch.com"},"billing_address":{"first_name":"Josh","last_name":"Maldonado","address1":"6613 Warbler Ln","phone":"555-555-5555","state":"Colorado","city":"Colorado Springs","country":"United States","zip":"80919"},"shipping_address":{"first_name":"Josh","last_name":"Maldonado","address1":"6613 Warbler Ln","phone":"777-777-7777","city":"Colorado Springs","state":"Colorado","country":"United States","zip":"80919"},"email":"joshm@topdrawermerch.com"},
       }),
      
     })
        .then((response) => response.json())
        .then((data) => {
           // Handle data
        })
        .catch((err) => {

        });
       
      }

function clearScreen(){
  setStatus(
    <div className="verified-parent">
      <div className="redirect-section">
          <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">SELECT TOKEN</h1>
          <p className="paragraph token-select-p">Select a claimable token below to begin the claim process for your free Budweiser World Cup Starter Kit.</p>
          
      </div>
     
      
      

    </div>
  );

}

function allowWallet(){



  setStatus(
    <div className="verified-parent">
      <div className="redirect-section">
          <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Select Claimable Token</h1>
          <p className="paragraph token-select-p">Select a Kith Friend™ token below to begin the claim process. Please note that only one token can be claimed at a time.</p>
          
      </div>
      <div id="nfts-container"></div>
      
      

    </div>
  );

  
  
}

 function denyWallet(){
   setStatus(
     <div className="redirect-section">
           <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Denied!</h1>
           <p className="paragraph">This wallet is not eligible for this drop. Open MetaMask and connect to a different wallet.</p>
           
       </div>
   );
 }
 
 function addWalletListener() {
   if (window.ethereum) {
     window.ethereum.on("accountsChanged", (accounts) => {
       if (accounts.length > 0) {
         setWallet(accounts[0]);
         setStatus(<h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Verifying...</h1>);
         
         verifyWallet();
         
         
       } else {
         setWallet("");
         setStatus(
          <div className="redirect-section landing-block">
   
   

          {/* <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Claim Closed</h1> */}
                                <p className="paragraph">Owners of a Kith Friend™ Edition M-XL are eligible to claim their respective Product Bundles. Please click the button below to connect your MetaMask wallet to begin the claiming process.</p>
             
                              <button id="walletButton" onClick={connectWalletPressed}>
                                  {walletAddress.length > 0 ? (
                                    "Connected: " +
                                    String(walletAddress).substring(0, 6) +
                                    "..." +
                                    String(walletAddress).substring(38)
                                  ) : (
                                    <span>Connect</span>
                                  )}
                                </button> 
       
                                {/* <a id="walletButton" className="token-checker-btn" onClick={tokenChecker}>Check a token</a> */}
                             
                           
            
        </div>
       );
       }
     });
   } else {
     if(isMobile){
       setStatus(
         <div className="redirect-section">
               <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">Browsing on mobile?</h1>
               <p className="paragraph">Click the button below to open this webpage in the Metamask Browser</p>
               <a id="walletButton" href="https://metamask.app.link/dapp/verify.kith.com/" >
                   Open in Metamask
                 </a>
             </div>
       );
     }
     else{
       setStatus(
         <div className="redirect-section">
               <h1 data-w-id="aa3fb2eb-a63f-4694-1b36-4534ed4f5a82" className="heading mobile">No Metamask extension found</h1>
               <p className="paragraph">Click the button below to download Metamask to supporting browsers</p>
               <a id="walletButton" href="https://metamask.io/download.html" >
                   Download Metamask
                 </a>
             </div>
       );
     }
   }
 }

return (
  <div className="Minter">
    

    
    <div id="status">
      {status}
    </div>

    

  </div>
);
};

export default Minter;
