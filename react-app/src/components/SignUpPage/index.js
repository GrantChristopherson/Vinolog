import React from 'react';
import SignUpForm from '../SignUpForm';
import Navigation from '../Navigation';
import Footer from "../Footer";




const SignUpPage = () => {

  
  return (
    <>
      <Navigation />
      <div className='splash_body'>
        <SignUpForm />
      </div>
      <Footer />
    </>
  );
};


export default SignUpPage;

