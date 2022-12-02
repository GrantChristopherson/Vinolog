import React from 'react';
// import Navbar from '../Navbar';
import Footer from '../Footer';
import './splash.css'

import Navigation from '../Navigation';



const Splash = () => {

  return (
    
    <>
      <Navigation />
      {/* <Navbar /> */}
      <div className='splash_body'>
        <div className='splash_container'>
          <div className='splash_quote'>
            <h2 className='quote'>"Wine is a passport to the world."</h2>
            <h4 className='credit'>- Thom Elkjer</h4>
          </div>
          <div className='slogan'>
            <h2 className='personal_jesus'>Journal the adventure with VINOLOG</h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Splash;