import React from 'react';
import SignUpForm from '../SignUpForm';
import Navigation from '../Navigation';
import Footer from "../Footer";




const SignUpPage = () => {

  
  return (
    <>
      <Navigation />
      <div className='signup_form_container'>
        <SignUpForm />
      </div>
      <Footer />
    </>
  );
};


export default SignUpPage;

