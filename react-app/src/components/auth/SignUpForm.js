import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signUpForm.css'

const SignUpForm = () => {

  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();




  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('/api/users/');
  //     const data = await response.json();
  //     setUsers(data.users);
  //   };
  //   fetchData();
  // }, []);

  
  const onSignUp = async (e) => {
    e.preventDefault();

    let validateErrors = [];
    
    if (!username.length || !email.length || !password.length || !repeatPassword.length) {
      validateErrors.push('input fields must be filled in')
    }

    if (username.length < 6 || username.length > 30) {
      validateErrors.push('User Name must be between 6 and 30 characters')
    };

    for (user in users) {
      if (user.username === username) {
        validateErrors.push('User Name must be unique')
      } else if (user.email === email) {
        validateErrors.push('Email must be unique')
      };
    };

    
    
    if (!email.includes('@')) {
      validateErrors.push('Must use a valid email')
    };

    if (password !== repeatPassword) {
      validateErrors.push('passwords must match')
    };

    if (password.length < 7 || password.length > 15) {
      validateErrors.push('password must be between 7 and 15 characters')
    }
    
    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return
    }

    
   
    ///////

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
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
    return <Redirect to='/' />;
  }

  return (
    <div className='signUpFormContainer'>
      <form className='signUpForm' onSubmit={onSignUp}>
        <div className='errorMessages'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
