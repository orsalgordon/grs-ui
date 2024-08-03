import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/HostService';
import './SignUpHostComponent.css'

const SignUpHostComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    const navigator = useNavigate();
  
    function submit(e) {
      e.preventDefault();
  
      const host = { firstName, lastName, email, password };
  
      console.log(host);
        signIn(host).then((response) => {
            console.log('Sign up success');
            navigator('/');
          }).catch((error) => {
            console.error('Error during sign up:', error);
          });
  
    }
  
    return (
      
      <div className='form-container-1'>
    <div className='row-1'>
        <div className='card-body'>
          <div className='card-body'>
            <h2>Create new account</h2>
            <form className="form-box" onSubmit={submit}>
            <div className='input-box'>
                <label>First name: </label>
                <input
                  type='text'
                  placeholder='Enter your first name'
                  name='firstName'
                  value={firstName}
                  className='form-control'
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
  
              <div className='input-box'>
              <label>Last name: </label>
                <input
                  type='text'
                  placeholder='Enter your last name'
                  name='lastName'
                  value={lastName}
                  className='form-control'
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
  
              <div className='input-box'>
              <label>Email: </label>
                <input
                  type='text'
                  placeholder='Enter your email'
                  name='email'
                  value={email}
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
  
              <div className='input-box'>
              <label>Password: </label>
                <input
                  type='password'
                  placeholder='Enter your password'
                  name='password'
                  value={password}
                  className='form-control'
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
  
              <button type="submit" onClick={submit}>Sign up</button>
  
            </form>
          </div>
        </div>
      </div>
  
    </div>
    )
  }  

export default SignUpHostComponent