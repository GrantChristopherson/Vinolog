import React from 'react';
import Navigation from '../Navigation';
import LoginForm from "../LoginForm";
import Footer from "../Footer";
import bottlesBg from '../../images/bottles-bg.png';
import './loginPage.css';




const LoginPage = () => {

  return (
    <>
      <Navigation />
      <div className='splash_body_container'>
        <div className='splash_body_image' style={{ backgroundImage: `url(${bottlesBg})` }}>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  );
};


export default LoginPage;
