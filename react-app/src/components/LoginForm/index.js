import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './loginForm.css'




const LoginForm = () => {
  // need aws work
  // fix aws bugs
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);


  const onLogin = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));

    let validateErrors = {};
    
    if (!email.includes('@') && !email.endsWith('.com')) {
      validateErrors['emailError'] = '* Valid email required';
    };

    if (!password) {
      validateErrors['passwordError'] = '* Valid password required';
    };

    if (isMounted.current) {
      setErrors(validateErrors)
      if (Object.keys(validateErrors).length) {
        return;
      };
    };
  };


  const demoUser = async (e) => {
    e.preventDefault();
    
    const email = 'demo@demo.io';
    const password = 'password';
    dispatch(login( email, password));
    
    let validateErrors = {};
    if (!email.includes('@') && !email.endsWith('.com')) {
      validateErrors['emailError'] = '* Valid email required';
    };
    
    if (!password) {
      validateErrors['passwordError'] = '* Valid password required';
    };
    
    if (isMounted.current) {
      setErrors(validateErrors)
      if (Object.keys(validateErrors).length) {
        return;
      };
    };
  };
  

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/lovedtastings' />;
  };

  

  
  return (
    <div className='login_form_container'>
      <form className='login_form' onSubmit={onLogin}>
        <div className='input_container'>
          {errors?.emailError !== undefined && <div className='error_messages'>
                    <div className='errors'>{errors.emailError}</div>
                  </div>
                  }
          <input className='card_input'
            id='email'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            autoComplete='email'
          />
        </div>
        <div className='input_container'>
          {errors?.passwordError !== undefined && <div className='error_messages'>
                      <div className='errors'>{errors.passwordError}</div>
                    </div>
                    }
          <input className='card_input'
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            autoComplete='current-password'
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

