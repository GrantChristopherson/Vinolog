import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
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
    return <Redirect to='/home' />;
  }

  return (
    // <div className='card'>
    //   <form className='card_form' onSubmit={onLogin}>
    //     <div className='error_messages'>
    //       {errors.map((error, ind) => (
    //         <div key={ind}>* {error}</div>
    //       ))}
    //     </div>
    //     <div className='email_container'>
    //       {/* <label htmlFor='email'>Email</label> */}
    //       <input className='card_input'
    //         name='email'
    //         type='text'
    //         placeholder='Email'
    //         value={email}
    //         onChange={updateEmail}
    //       />
    //     </div>
    //     <div className='password_container'>
    //       {/* <label htmlFor='password'>Password</label> */}
    //       <input className='card_input'
    //         name='password'
    //         type='password'
    //         placeholder='Password'
    //         value={password}
    //         onChange={updatePassword}
    //       />
    //       <div className='login_buttons'>
    //         <button className='demo_button' onClick={demoUser}>
    //           <span>Demo User</span>
    //         </button>
    //         <button className='login_button' type='submit'>
    //           <span>Login</span>
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
    // --------------------------------------------------------------
    
    // <svg className='blob' id='visual' viewBox='0 0 900 600' 
    // width='900' height='600' xmlns='http://www.w3.org/2000/svg'
    // xmlns:xlink='http://www.w3.org/1999/x.link' version='1.1'><g
    // transform='translate(424.1970790198573 292.17104505435265)'>
    // <path d='M53.8 -65.8C75.8 -58 104 -50.5 119.8 -31.8C135.7
    // -13.2 139.2 16.6 128.3 39.1C117.4 61.6 92.2 76.9 68.4 84.7C44.7
    // 92.5 22.3 92.7 -2 95.4C-26.3 98.1 -52.5 103.3 -66.9 92.5C-81.4 
    // 81.6 -84 54.9 -82.7 33C-81.5 11 -76.4 -6.1 -70.9 -23C-65.4 -40
    // -59.4 -56.8 -47.5 -67.9C-35.7 -79.1 -23C-65.4 -40 -59.4 -56.8
    // -47.5 -67.9C-35.7 -79.1 -17.8 -84.5 -1 -83.2C15.9 -81.8 31.7 
    // -73.7 53.8 -65.8' fill='#36515c'></path></g></svg>
    <div className='login_form'>
      <h1 className='log_in'>Log In</h1>
      <form className='card_form' onSubmit={onLogin}>
         <div className='error_messages'>
           {errors.map((error, ind) => (
            <div key={ind}>* {error}</div>
          ))}
        </div>
        <div className='email_container'>
          {/* <label htmlFor='email'>Email</label> */}
          <input className='card_input'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='password_container'>
          {/* <label htmlFor='password'>Password</label> */}
          <input className='card_input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <div className='login_buttons'>
            <button className='login_demo' onClick={demoUser}>
              <span>Demo User</span>
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

       

// {/* <>
//       <div className='login-container'>
//         <form className='login-form' onSubmit={onLogin}>
//           <div className='error-messages'>
//             {errors.map((error, ind) => (
//               <div key={ind}>* {error}</div>
//             ))}
//           </div>
//           <div className='email-container'>
//             {/* <label htmlFor='email'>Email</label> */}
//             <input className='email-input'
//               name='email'
//               type='text'
//               placeholder='Email'
//               value={email}
//               onChange={updateEmail}
//             />
//           </div>
//           <div className='password-container'>
//             {/* <label htmlFor='password'>Password</label> */}
//             <input className='password-input'
//               name='password'
//               type='password'
//               placeholder='Password'
//               value={password}
//               onChange={updatePassword}
//             />
//             <div className='login-buttons-container'>
//               <button className='demo-button' onClick={demoUser} >Demo User</button>
//               <button className='login-button' type='submit'>Login</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </> */}
