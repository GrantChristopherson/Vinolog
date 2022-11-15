import React from 'react';
// import Navbar from '../navbar/Navbar.js';
import Sidebar from '../Sidebar';
import HomeBody from '../HomeBody';
import Footer from '../Footer';
import './home.css'



const Home = () => {

  return (
    
    <>
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
          
