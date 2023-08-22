import React from 'react';
import SignUpForm from '../SignUpForm';
import Navigation from '../Navigation';
import bottlesBg from '../../images/bottles-bg.png';
import Footer from "../Footer";




const SignUpPage = () => {

  
  return (
    <>
      <Navigation />
      <div className='splash_body_container'>
        <div className='splash_body_image' style={{ backgroundImage: `url(${bottlesBg})` }}>
          <SignUpForm />
        </div>
      </div>
      <Footer />
    </>
  );
};


export default SignUpPage;

