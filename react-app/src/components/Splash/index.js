import React from 'react';
// import Navbar from '../navbar/Navbar.js';
import Footer from '../Footer';
import './splash.css'



const Splash = () => {

  return (
    
    <>
      {/* <Navbar /> */}
      <div className='outerSplash'>
        <div className='splashBody'>
          <img src='https://www.thespruceeats.com/thmb/9Hs8J5W4z6gh04WUL7uTs__4rq0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/close-up-of-wine-bottles-over-white-background-609198963-5844948f5f9b5851e57ef400.jpg' className='wineBottles'></img>
          {/* <p className='splashQuote'><h2>"Wine is a passport to the World."</h2><h5 className='qouteCredit'>- Thom Elkjer</h5></p> */}
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
      <Footer />
    </>
  );
};


export default Splash;