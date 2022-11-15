import React from 'react';
import LoginForm from "../LoginForm";
import Navbar from '../Navbar';
import Footer from "../Footer";
import './loginPage.css';



const LoginPage = () => {

  return (
    <>
      <Navbar />
      <div className='outerSplash'>
        <div className='leftSplashBody'>
          <div className='slogan'>
            <h1 className='welcome'>Welcome to Vinolog!</h1>
            <h3 className='personalJesus'>Personal Wine Journal</h3>
          </div>
          <div className="LoginWrapper">
            <LoginForm />
          </div>
          <h3 className='journey' >Document your journey...</h3>
        </div>
        <div className='rightSplashBody'>
          <h2>"Wine is a passport to the World."</h2>
          <h5 className='qouteCredit'>- Thom Elkjer</h5>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default LoginPage;