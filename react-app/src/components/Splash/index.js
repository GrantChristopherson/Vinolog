import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import bottlesBg from '../../images/bottles-bg.png';
import './splash.css'




const Splash = () => {

  return (
    <>
      <Navigation />
      <div className='splash_body_container'>
        <div className='splash_body_image' style={{ backgroundImage: `url(${bottlesBg})` }}>
          <div className='splash_container'>
          <div className='quote_container'>
              <div className='splash_quote'>
                <span className='quote'>"Happy holidays to everyone!"</span>
              </div>
            </div>
            <div className='quote_container'>
              <div className='splash_quote'>
                <span className='quote'>"Wine is a passport to the world."</span>
                <span className='credit'>- Thom Elkjer</span>
              </div>
              <div className='slogan'>
                <span className='personal_jesus'>Journal the adventure with VINOLOG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Splash;