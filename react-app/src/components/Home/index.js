import React from 'react';
// import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import HomeBody from '../HomeBody';
import Footer from '../Footer';
import './home.css';

import Navigation from '../Navigation';



const Home = () => {

  return (
    
    <>
      <Navigation /> 
      {/* <Navbar /> */}
      <div className='home_body'>
        <Sidebar />
        <HomeBody />
      </div>
      <Footer />
    </>
  );
};


export default Home;
          
