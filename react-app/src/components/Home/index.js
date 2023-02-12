import React from 'react';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import HomeBody from '../HomeBody';
import Footer from '../Footer';
import './home.css';




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
          
