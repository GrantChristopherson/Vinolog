import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import './splash.css'




const Splash = () => {

  return (
    <>
      <Navigation />
      <div className='splash_body'>
        <div className='splash_container'>
          <div className='quote_container'>
            <div className='splash_quote'>
              <h2 className='quote'>"Wine is a passport to the world."</h2>
              <h4 className='credit'>- Thom Elkjer</h4>
            </div>
            <div className='slogan'>
              <h2 className='personal_jesus'>Journal the adventure with VINOLOG</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Splash;