import React from 'react';
import Navigation from '../Navigation';
import LoginForm from "../LoginForm";
import Footer from "../Footer";
import './loginPage.css';




const LoginPage = () => {

  return (
    <>
      <Navigation />
      <div className='splash_body'>
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};


export default LoginPage;
