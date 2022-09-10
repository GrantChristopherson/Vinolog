import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Splash from '../Splash/Splash';
import './signUpForm.css'

const SignUpForm = () => {

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const onSignUp = async (e) => {
    e.preventDefault();

    let validateErrors = [];

    if (username.length < 6 || username.length > 15) {
      validateErrors.push('* User Name must be between 6 and 15 characters')
    };
    if (username.trim().length === 0) validateErrors.push('* Spacebar exclusive input is not a valid username');

    if (!email.includes('@' && '.')) {
      validateErrors.push('* Must use a valid email')
    };
    if (email.length < 12 || email.length > 30) validateErrors.push('* Email must be between 12 and 30 characters');
    if (email.trim().length === 0) validateErrors.push('* Spacebar exclusive input is not a valid email');

    if (password !== repeatPassword) {
      validateErrors.push('* Passwords must match')
    };

    if (password.length < 7 || password.length > 15) {
      validateErrors.push('* Password must be between 7 and 15 characters')
    }
    if (password.trim().length === 0) validateErrors.push('* Spacebar exclusive input is not a valid password');
    
    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return
    };

    
   
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      };
    };
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div>
      <Splash />
      <div className='signUpFormContainer'>
        <form className='signUpForm' onSubmit={onSignUp}>
          <div className='errorMessages'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='usernameWrapper'>
            <label>Username</label>
            <input 
              type='text'
              name='username'
              placeholder='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='emailWrapper'>
            <label>Email</label>
            <input 
              type='text'
              name='email'
              placeholder='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='passwordWrapper'>
            <label>Password</label>
            <input 
              type='password'
              name='password'
              placeholder='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='repeatedPasswordWrapper'>
            <label>Repeat Password</label>
            <input 
              type='password'
              name='repeat_password'
              placeholder='password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>
          <div className='signUpButtonWrapper'>
            <button className='signUpButton' type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
