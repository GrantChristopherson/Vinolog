import React from 'react';
// import Navbar from '../Navbar';
import Footer from '../Footer';
import './splash.css'



const Splash = () => {

  return (
    
    <>
      {/* <Navbar /> */}
      <div className='splash-body'>
        <img src='https://www.thespruceeats.com/thmb/9Hs8J5W4z6gh04WUL7uTs__4rq0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/close-up-of-wine-bottles-over-white-background-609198963-5844948f5f9b5851e57ef400.jpg' className='wine-bottles' alt='wine-bottles-background'></img>
          {/* <div className='splash-quote'>
            <h2>"Wine is a passport to the World."</h2>
            <h5 className='qoute-credit'>- Thom Elkjer</h5>
          </div>
          <div className='slogan'>
            <h3 className='personal-jesus'>Keep track using VINOLOG Wine Journal</h3>
          </div> */}
      </div>
      <Footer />
    </>
  );
};


export default Splash;