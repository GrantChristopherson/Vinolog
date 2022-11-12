import React from 'react';
import SignUpForm from "./SignUpForm.js";
import Navbar from "../navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import './signUpForm.css';



const SignUpPage = () => {

  
  return (
    <>
      <Navbar />
      <div className='outerSplash'>
        <div className='leftSplashBody'>
          <div className='slogan'>
            <h1>Welcome to Vinolog!</h1>
            <h3 className='personalJesus'>Personal Wine Journal</h3>
          </div>
          <SignUpForm />
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


export default SignUpPage;