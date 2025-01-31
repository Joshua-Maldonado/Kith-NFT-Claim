import React from 'react'
import env from "react-dotenv";
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { ethers } from 'ethers';


 const dbb = new DynamoDB({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: 'us-west-2'});
 require('dotenv').config();

 const apiKey = process.env.REACT_APP_TOKEN_APIKEY;

//  const web3 = createAlchemyWeb3(
//   `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
// );


class MProductForm extends React.Component {

    

    constructor(props) {
        super(props)
        this.state = this.initialState()
        this.handleChange = this.handleChange.bind(this)
        // this.handleChangeSmall = this.handleChangeSmall.bind(this)
        // this.handleChangeMed = this.handleChangeMed.bind(this)
        // this.handleChangeLarge = this.handleChangeLarge.bind(this)
        // this.handleChangeXLarge = this.handleChangeXLarge.bind(this)
        // this.handleChangeXXLarge = this.handleChangeXXLarge.bind(this)
        // this.handleChangeXXXLarge = this.handleChangeXXXLarge.bind(this)
        // this.updateInventory = this.updateInventory.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
      }
      
      
    
      componentDidMount() {
        
        
        
        //this.updateInventory();
          
        
        
        
      }
    
      initialState() {
        return {
          token_id: this.props.tokenid,
          selected: '',
          discountCode: '',
          wallet: this.props.wallet,
          dis_status: true,
          xsmall: false,
          small: false,
          med: false,
          large: false,
          xlarge: false,
          xxlarge: false,
          xxxlarge: false,
          variant_ids:{
            xsmall: "44088802640180",
            small: "44052540817716",
            med: "44052540850484",
            large: "44052540883252",
            xlarge: "44052540916020",
            xxlarge: "44052540948788",
            xxxlarge: "44088803524916"
          }
        }
      }

   

      handleChange = event => {
        console.log("VARIANT ID: "+event.target.value);
        
          this.setState({['selected']: event.target.value},
              () => {
                  
                  var old = document.getElementsByClassName("selected");
                  for(var i = 0; i<old.length; i++){
                      old[i].classList.remove("selected");
                  }
                  event.target.classList.add("selected");
              });
            var submitButton = document.getElementsByClassName('submit-buttom');
            submitButton[0].classList.remove("disabled");
            submitButton[0].innerText = "CLAIM NOW";
            this.setState({['dis_status']: false});
        
      }

      setDiscountCode = () => {
        console.log()
      }

      handleSubmit = async event => {
        event.preventDefault();
        try{
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          //await provider.send("eth_requestAccounts", []);
          

          const signer = provider.getSigner();
          await signer.getAddress().then(async (res) => {
            console.log("RESPONSE: "+ res + " CONNECTED: "+ this.state.wallet );
            if(res === this.props.wallet){
              await signer.signMessage("Confirm merch claim on 1 Kith Friend™ Edition M Bundle").then((res) => {
                //console.log("SUCCESS: "+res);
                var url = "https://kith-launches.myshopify.com/cart/43182295220352:1,43182297317504:1,"+ this.state.selected +":1,43182297645184:1?note="+this.props.wallet+"&discount="+this.props.uuid;
                    
                  
            
                    
                    console.log("URL: "+ url);
                    window.location.href = url;
            
                    }).catch((err) => {
                            console.error('Error:', err);
                            
                  });
            }
            else{
              this.props.error();

            }
          })
        }
        catch(err){
          console.log(err);
        }


      }

      render() {
        return(
            <div className="product-form">
                <div className="variant-parent">
                    <div className="variant-label-parent">
                      <p className="paragraph">Shoe Size</p>
                    </div>
                    
                    <div className="buttons-parent">
                        <select id="variant-selector" className="parent-selector" defaultValue="1" onChange={this.handleChange} >
                          <option value="1" disabled>Select your size</option>
                          <option value="43182296072320" className="variant-button" disabled={this.state.med} onClick={this.handleChangeMed}>5</option>
                          <option value="43182296105088" className="variant-button" disabled={this.state.large} onClick={this.handleChangeLarge}>5.5</option>
                          <option value="43182296137856" className="variant-button" disabled={this.state.xlarge} onClick={this.handleChangeXLarge}>6</option>
                          <option value="43182296170624" className="variant-button" disabled={this.state.xxlarge} onClick={this.handleChangeXXLarge}>6.5</option>
                          <option value="43182296203392" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>7</option>
                          <option value="43182296236160" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>7.5</option>
                          <option value="43182296268928" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>8</option>
                          <option value="43182296301696" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>8.5</option>
                          <option value="43182296334464" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>9</option>
                          <option value="43182296367232" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>9.5</option>
                          <option value="43182296400000" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>10</option>
                          <option value="43182296432768" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>10.5</option>
                          <option value="43182296465536" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>11</option>
                          <option value="43182296498304" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>11.5</option>
                          <option value="43182296531072" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>12</option>
                          <option value="43182296563840" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>12.5</option>
                          <option value="43182296596608" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>13</option>
                          <option value="43182296629376" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>14</option>
                        </select>

                        {/* <button id="44088802640180" className="variant-button" disabled={this.state.xsmall} onClick={this.handleChange}>4</button>
                        <button id="44052540817716" className="variant-button" disabled={this.state.small} onClick={this.handleChangeSmall}>4.5</button>
                        <button id="44052540850484" className="variant-button" disabled={this.state.med} onClick={this.handleChangeMed}>5</button>
                        <button id="44052540883252" className="variant-button" disabled={this.state.large} onClick={this.handleChangeLarge}>5.5</button>
                        <button id="44052540916020" className="variant-button" disabled={this.state.xlarge} onClick={this.handleChangeXLarge}>6</button>
                        <button id="44052540948788" className="variant-button" disabled={this.state.xxlarge} onClick={this.handleChangeXXLarge}>6.5</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>7</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>7.5</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>8</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>8.5</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>9</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>9.5</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>10</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>10.5</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>11</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>11.5</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>12</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>12.5</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>13</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>13.5</button>
                        <button id="44088803524916" className="variant-button" disabled={this.state.xxxlarge} onClick={this.handleChangeXXXLarge}>14</button> */}
                    </div>
                </div>
                <button id="walletButton" className="next-product submit-buttom disabled" disabled={this.state.dis_status} onClick={this.handleSubmit}>SELECT SIZE</button>
            </div>
        )
      }


}

export default MProductForm