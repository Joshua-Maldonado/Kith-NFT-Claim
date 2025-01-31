import './App.css';
import Minter from './Minter';


function App() {
  console.log("Mounting");
  
    return (
      <div className="App">
       <div className="page-width nav">
        <div className="nav-section">
          <img src="logo.png" loading="lazy" alt="" className="promo-image"></img>
            
          </div>
          
      </div>
      

      {/* <div className="page-width image-section"><img src="banner.jpg" className="desktop-img" loading="lazy"  alt=""></img><img className="mobile-img" src="mobile-banner.png" loading="lazy"  alt=""></img></div> */}
  
      
      <div className="page-width main-content wf-section">
        <div className="redirect-section">
        <Minter></Minter>
        </div>
      </div>
      <div className="footer wf-section">
        <div className="footer-main-content">
          <p className="powered-by-text">Web3 & verification by Top Drawer Merch</p>
        </div>
        
      </div>
    </div>
    );
  
  
}

export default App;

