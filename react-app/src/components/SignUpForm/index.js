import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signUpForm.css'


// todo: find and mimic more clean signup
// any validation checks on profile image url input??

const SignUpForm = () => {

  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const onSignUp = async (e) => {
    e.preventDefault();

    let validateErrors = {};

    if (username.length < 6 || username.length > 15) {
      validateErrors['userNameError'] = '* User Name must be between 6 and 15 characters';
    };
    if (username.trim().length === 0) validateErrors['userNameError'] = '* Spacebar exclusive input is not a valid username';

    if (!email.includes('@' && '.')) {
      validateErrors['emailError'] = '* Must use a valid email';
    };
    if (email.length < 12 || email.length > 30) validateErrors['emailError'] = '* Email must be between 12 and 30 characters';
    if (email.trim().length === 0) validateErrors['emailError'] = '* Spacebar exclusive input is not a valid email';

    if (password !== repeatPassword) {
      validateErrors['passwordError'] = '* Passwords must match';
    };

    if (password.length < 7 || password.length > 15) {
      validateErrors['passwordError'] = '* Password must be between 7 and 15 characters';
    }
    if (password.trim().length === 0) validateErrors['passwordError'] = '* Spacebar exclusive input is not a valid password';
    
    
    setErrors(validateErrors)
    if (Object.keys(validateErrors).length) {
      return;
    };

   
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, profileImage, password));
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

  const updateProfileImage = (e) => {
    setProfileImage(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/lovedtastings' />;
  }


  return (
    <div className='signup_form'>
      <div className='signup_header_container'>
        <h1 className='form_title'>Sign Up</h1>
      <form onSubmit={onSignUp} action=''>
        <div className='input_container'>
          {errors?.userNameError !== undefined && <div className='error_messages'>
                      <div className='errors'>{errors.userNameError}</div>
                    </div>
                    }
          <i className='ri_username_line'></i>
          <input className='form_input'
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
          ></input>
          <span className='bar'></span>
        </div>
        <div className='input_container'>
          {errors?.emailError !== undefined && <div className='error_messages'>
                      <div className='errors'>{errors.emailError}</div>
                    </div>
                    }
          <i className='ri_email_line'></i>
          <input className='form_input'
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
          ></input>
          <span className='bar'></span>
        </div>
        <div className='input_container'>
          {/* {errors?.userNameError !== undefined && <div className='error_messages'>
                      <div className='errors'>{errors.userNameError}</div>
                    </div>
                    } */}
          <i className='ri_profile_image_line'></i>
          <input className='form_input'
            type='text'
            name='profileImage'
            placeholder='Profile Image URL'
            onChange={updateProfileImage}
            value={profileImage}
          ></input>
          <span className='bar'></span>
        </div>
        <div className='input_container'>
          {errors?.passwordError !== undefined && <div className='error_messages'>
                        <div className='errors'>{errors.passwordError}</div>
                      </div>
                      }
          <i className='ri_password_line'></i>
          <input className='form_input'
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
          ></input>
          <span className='bar'></span>
        </div>
        <div className='input_container'>
          <i className='ri_password_line'></i>
          <input className='form_input'
            type='password'
            name='repeat_password'
            placeholder='Confirm password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
          ></input>
          <span className='bar'></span>
        </div>
        <div className='signup_button_container'>
          <button className='signup_button' type='submit'>Sign Up</button>
          <span className='form_switch'>
            Already have an account? 
            <NavLink to='/login' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
              <h4 className ='switch_to_login' style={{textDecoration: 'none'}}>Login</h4>
            </NavLink>
          </span>
        </div>
      </form>
      </div>
    </div>
  );
};


export default SignUpForm;
