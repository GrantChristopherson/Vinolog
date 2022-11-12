import React from 'react';
import Navbar from '../navbar/Navbar.js';
import Sidebar from '../Sidebar/Sidebar.js';
import HomeBody from '../HomeBody/HomeBody.js';
import Footer from '../Footer/Footer.js';
import './home.css'



const Home = () => {

  return (
    
    <>
      <Navbar />
      <div className='home_body'>
        <Sidebar />
        <HomeBody />
      </div>
      <Footer />
    </>
  );
};


export default Home;
          
