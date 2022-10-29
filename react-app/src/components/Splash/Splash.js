import React from 'react';
import './splash.css'



const Splash = () => {

  return (
    <>
      <div className='outerSplash'>
        <div>
          <img src="seppia-grapes.png" alt='seppia-grapes' className='seppiaGrapes'></img>
        </div>
        {/* <div className='splashBody'>
          <div className='splashQuote'>
            <h2>"Wine is a passport to the World."</h2>
            <h5 className='qouteCredit'>- Thom Elkjer</h5>
          </div>
          <div className='slogan'>
            <h3 className='personalJesus'>Keep track using VINOLOG Wine Journal</h3>
          </div>
        </div> */}
      </div>
      <footer>
        <div className='footeraboutMeContainer'>
          <h5 className='devBy'>Developed by: </h5>
          <h4 className='devName'>Grant Christopherson</h4>
          <div className='footerLinksContainer'>
            <a className = {"LinkedLink"} href={"https://www.linkedin.com/in/GrantChristopherson-SF"} target="_blank" rel="noopener noreferrer">
            <i id='linked' className="fa-brands fa-linkedin-in linkedInIcon"></i>
            <a href={"https://github.com/GrantChristopherson"} target="_blank" rel="noopener noreferrer">
            <i id='git' className="fa-brands fa-github gitHubicon"></i></a>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};


export default Splash;