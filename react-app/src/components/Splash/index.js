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
          <img className='splash_wine_ring' src='https://img.freepik.com/free-photo/texture-red-wine-stains_23-2149552760.jpg?w=2000&t=st=1688256704~exp=1688257304~hmac=a9353554dd38dc3ca04c11d3712d6f13579f4377d3ebcff40e367ede3c3826b0' alt='wine ring'/>
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