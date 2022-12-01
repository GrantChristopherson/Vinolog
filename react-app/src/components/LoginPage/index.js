import React from 'react';
import LoginForm from "../LoginForm";
// import Navbar from '../Navbar';
import Footer from "../Footer";
import './loginPage.css';

import Navigation from '../Navigation';


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
