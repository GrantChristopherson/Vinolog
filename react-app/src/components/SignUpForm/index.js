import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signUpForm.css';





const SignUpForm = () => {

  
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => setIsMounted(false);
  }, []);

  const onSignUp = async (e) => {
    e.preventDefault();

    let validateErrors = {};

    const file = fileInputRef.current?.files[0];

    if (username.trim().length === 0) {
      validateErrors['userNameError'] = '* Spacebar exclusive input is not a valid username';
    } else if (username.length < 6 || username.length > 15) {
      validateErrors['userNameError'] = '* Username must be between 6 and 15 characters';
    };

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 
      // checking at least one character before the "@" symbol, 
      // at least one character after the "@" symbol and before the dot,
      // and there are 2 to 6 characters after the dot like 'com' or 'org'

    if (!emailPattern.test(email)) {
      validateErrors['emailError'] = '* Must use a valid email';
    } else if (email.length < 12 || email.length > 30) {
      validateErrors['emailError'] = '* Email must be between 12 and 30 characters';
    };


    // const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //   '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    // if (profileImage && !urlPattern.test(profileImage)) {
    //   validateErrors['profileImageError'] = '* Please provide a valid URL';
    // };

    if (file) {
      // 1. Validating File Size (For example, limit to 4MB)
      if (file.size > 4 * 1024 * 1024) {
        validateErrors['profileImageError'] = '* The image file is too large (max 4MB)';
      };
    
      // 2. Validating File Type
      const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!acceptedImageTypes.includes(file.type)) {
        validateErrors['profileImageError'] = '* The image file format is not supported';
      };
    };

    if (password.trim().length === 0) {
      validateErrors['passwordError'] = '* Spacebar exclusive input is not a valid password';
    } else if (password !== repeatPassword) {
      validateErrors['passwordError'] = '* Passwords must match';
    } else if (password.length < 7 || password.length > 15) {
      validateErrors['passwordError'] = '* Password must be between 7 and 15 characters';
    };
    

    setErrors(validateErrors)
    if (Object.keys(validateErrors).length === 0) {
      const data = await dispatch(signUp(username, email, profileImage, password));
      if (isMounted && data) {
        setErrors(data);
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
  };




  return (
    <div className='signup_form_container'>
      <form onSubmit={onSignUp} action='' className='signup_form'>
        <div className='input_container'>
          {errors?.userNameError !== undefined && <div className='error_messages'>
                      <div className='errors'>{errors.userNameError}</div>
                    </div>
                    }
          <input className='form_input'
            id='username'
            name='username'
            type='text'
            placeholder='Username'
            value={username}
            onChange={updateUsername}
            autoComplete='username'
          ></input>
        </div>
        <div className='input_container'>
          {errors?.emailError !== undefined && <div className='error_messages'>
                      <div className='errors'>{errors.emailError}</div>
                    </div>
                    }
          <input className='form_input'
            id='email'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            autoComplete='email'
          ></input>
        </div>
        <div className='input_container'>
          {errors?.passwordError !== undefined && <div className='error_messages'>
                        <div className='errors'>{errors.passwordError}</div>
                      </div>
                      }
          <input className='form_input'
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            autoComplete='new-password'
          ></input>
        </div>
        <div className='input_container'>
          <input className='form_input'
            id='repeat_password'
            name='repeat_password'
            type='password'
            placeholder='Confirm password'
            value={repeatPassword}
            onChange={updateRepeatPassword}
            autoComplete='new-password'
          ></input>
        <div className='file_input_container'>
              {errors?.profileImageError !== undefined && <div className='error_messages'>
                <div className='errors'>{errors.profileImageError}</div>
              </div>
              }
              <label className='user_profile_label'>Upload a profile photo...</label>
              <input className='file_input'
              id='profileImage'
              type='file'
              name='profileImage'
              onChange={updateProfileImage}
              autoComplete='profileImage'
              ref={fileInputRef}
              placeholder='Upload a profile photo...'
              value={profileImage}
              ></input> 
            </div>
        </div>
        <div className='signup_button_container'>
          <button className='signup_button' type='submit'>Sign Up</button>
          <div className='login_switch_container'>
            <span className='form_switch'>
              Already have an account? 
            </span>
            <NavLink to='/login' exact={true} className ='switch_to_login' activeClassName='active' style={{textDecoration: 'none'}}>
              <h4 className='login_link'>Login</h4>
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};


export default SignUpForm;
