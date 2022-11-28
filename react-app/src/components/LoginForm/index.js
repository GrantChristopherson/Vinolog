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
    <div className='card'>
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
            <button className='demo_button' onClick={demoUser}>
              <span>Demo User</span>
            </button>
            <button className='login_button' type='submit'>
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
