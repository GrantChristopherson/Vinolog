import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './loginForm.css'




const LoginForm = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password)); // removed await from in front of this dispatch but throws error locally?
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
    await dispatch(login( email, password)); // removed await from in front of this dispatch but throws error locally?
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
      <form className='card_form' onSubmit={onLogin}>
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
        </div>
        <div className='login_inputs'>
          <button className='login_login' type='submit'>
            <span>Login</span>
          </button>
          <div className='signup_demo'>
            <span className='switch'>Don't have an account?</span>
            <span className='links_wrapper'>
              <NavLink to='/sign-up' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
                <h4 className ='switch_to_signup' >Sign Up</h4>
              </NavLink>
              <h6 className='or' >or</h6>
              <button className='login_demo' onClick={demoUser}>
                <h4 className='demo_site'>Demo Site</h4>
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};


export default LoginForm;

