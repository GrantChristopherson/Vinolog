import React from 'react';
// import Navbar from '../Navbar';
import Footer from '../Footer';
import './splash.css'



const Splash = () => {

  return (
    
    <>
      {/* <Navbar /> */}
      <div className='splash-body'>
        <div className='splash-quote'>
          <h1 className='quote'>"Wine is a passport to the World."</h1>
          <h3 className='credit'>- Thom Elkjer</h3>
        </div>
        <div className='slogan'>
          <h2 className='personal-jesus'>Document your travels with VINOLOG Wine Journal</h2>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Splash;