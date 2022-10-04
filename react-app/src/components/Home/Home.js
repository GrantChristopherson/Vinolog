import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './home.css'



const Home = () => {

  return (
    <>
      <div className='homeContainer'>
        <div className='userContainer'>
          <Sidebar />
        </div>
      </div>
      <footer>
        <div className='footerHomeContainer'>
          <h4 className='homeFooterPhrase'>Personal Wine Journal</h4>
        </div>
      </footer>
    </>
  );
};


export default Home;
          
