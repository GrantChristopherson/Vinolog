import React from 'react';
import Navigation from '../Navigation';
import LoginForm from "../LoginForm";
import Footer from "../Footer";
import './loginPage.css';


// todo: find and mimic more clean login

const LoginPage = () => {

  return (
    <>
      <Navigation />
      <div className='splash_body_login'>
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};


export default LoginPage;
