import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Splash from '../Splash/Splash';
import './loginForm.css'

const LoginForm = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
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
    const data = await dispatch(login( email, password));
    if (data) {
      setErrors(data);
    };
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <Splash />
      <div className='loginFormContainer'>
        <form className='loginForm' onSubmit={onLogin}>
          <div className='errorMessages'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='emailWrapper'>
            <label htmlFor='email'>Email</label>
            <input className='emailInput'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='passwordWrapper'>
            <label htmlFor='password'>Password</label>
            <input className='passwordInput'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div className='loginButtonWrapper'>
              <div className='loginInnerWrapper'>
                <button classname='loginDemoButtons' onClick={demoUser} >Demo</button>
                <button classname='demoButton' type='submit'>Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};



export default LoginForm;

