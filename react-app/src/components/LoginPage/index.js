import React from 'react';
import LoginForm from "../LoginForm";
// import Navbar from '../Navbar';
import Footer from "../Footer";
import './loginPage.css';



const LoginPage = () => {

  return (
    <>
      {/* <Navbar /> */}
      <div className='splash-body'>
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};


export default LoginPage;