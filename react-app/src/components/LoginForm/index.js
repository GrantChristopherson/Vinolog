import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginForm.css'


// todo: find and mimic more clean login

const LoginForm = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password)); // removed await from in front of this dispatch but throws error locally?
    // if (data) {
    //   setErrors(data);
    // }
    let validateErrors = {};
    if (!email.includes('@') && !email.endsWith('.com')) {
      validateErrors['emailError'] = '* Valid email required';
    };

    if (!password) {
      validateErrors['passwordError'] = '* Valid password required';
    };

    setErrors(validateErrors)
    if (Object.keys(validateErrors).length) {
      return;
    };
  };


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };


  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  const demoUser = async (e) => {
    e.preventDefault();
    const email = 'demo@demo.io';
    const password = 'password';
    const data = await dispatch(login( email, password)); // removed await from in front of this dispatch but throws error locally?
    // if (data) {
    //   setErrors(data);
    // };
    let validateErrors = {};
    if (!email.includes('@') && !email.endsWith('.com')) {
      validateErrors['emailError'] = '* Valid email required';
    };

    if (!password) {
      validateErrors['passwordError'] = '* Valid password required';
    };

    setErrors(validateErrors)
    if (Object.keys(validateErrors).length) {
      return;
    };
  };


  if (user) {
    return <Redirect to='/lovedtastings' />;
  }

  
  return (
    <div className='login_form'>
      <div className='login_header_container'>
        <h1 className='login_header'>Login</h1>
      </div>
      <form className='card_form' onSubmit={onLogin}>
         {/* <div className='error_messages'>
          {errors.map((error, ind) => (
            <div key={ind}>* {error}</div>
          ))}
        </div> */}
        <div className='input_container'>
          {errors?.emailError !== undefined && <div className='error_messages'>
                    <div className='errors'>{errors.emailError}</div>
                  </div>
                  }
          <input className='card_input'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <span className='bar'></span>
        </div>
        <div className='input_container'>
          {errors?.passwordError !== undefined && <div className='error_messages'>
                      <div className='errors'>{errors.passwordError}</div>
                    </div>
                    }
          <input className='card_input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <span className='bar'></span>
          <div className='login_buttons'>
            <button className='login_demo' onClick={demoUser}>
              <span>Demo Vinolog</span>
            </button>
            <button className='login_login' type='submit'>
              <span>Login</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};


export default LoginForm;
