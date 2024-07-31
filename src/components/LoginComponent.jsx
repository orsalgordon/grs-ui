import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../services/HostService';
import {useCookies } from 'react-cookie'
import './LoginComponent.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


const LoginComponent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();
    const [cookies, setCookies] = useCookies(['grsId']);

    function login(e) {
        e.preventDefault();
    
        const request = { email, password };
    
        loginRequest(request).then((response) => {
            console.log(response.data);
            if (response.data.status) {
                setCookies('grsId', response.data.message, { path: '/'})
                navigator('/');
            } else {
                console.log('Incorrect login details');
            }

          }).catch((error) => {
            console.error('Error during login:', error);
          });
    }

    function redirect(){
        navigator('/sign-up');
    }

  return (
    <div className='form-container'>
    <div className='row'>
      <div className='card-body'>
        <div className='card-body'>
          <h2>Sign in</h2>
          <div className="underline"></div>
          <form className="form-box">
            <div className='input-box'>
              <input
                type='text'
                placeholder='Email'
                name='email'
                value={email}
                className="input-text"
                onChange={(e) => setEmail(e.target.value)}
              ></input><FaUser className="icon"/>
            </div>

            <div className='input-box'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                className="input-text"
                onChange={(e) => setPassword(e.target.value)}
              ></input><RiLockPasswordFill className="icon" />
            </div>

            <div>
              <button type="button" onClick={login}>Submit</button>
            </div>
            <p>Don't have account? <a onClick={redirect}>Register</a></p>
            

          </form>
        </div>
      </div>
    </div>

  </div>
  )
}

export default LoginComponent