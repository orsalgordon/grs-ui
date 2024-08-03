import logo from '../assets/logo.jpg'
import React, { useEffect, useState } from 'react'
import { hostDetails } from '../services/HostService'
import { useNavigate, useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HeaderComponent = () => {

  const [host, setHost] = useState([])
  const navigator = useNavigate();
  const grsId = window.localStorage.getItem("grsId");
  let query = useQuery();
  let keyParam = query.get('key');


  useEffect(() => {

    if (grsId) {
      hostDetails(grsId).then((response) => {
        setHost(response.data)
      }).catch(error => {
        console.error(error);
      })
    }
  }, [])

  function redirect() {
    navigator('/sign-up');
  }

  function login() {
    navigator('/login');
  }

  function logout() {
    window.localStorage.removeItem("grsId");
    navigator('/');
  }

  function isLogin() {
    console.log('ID: ' + grsId);
    if (grsId == undefined) {
      return (
        <div className='flex space-x-14 item-center'>
          <a className='text-align: right space-x-3'>
            <button type="button" class="btn btn-dark" onClick={redirect}>create account</button>
            <button type="button" class="btn btn-lite" onClick={login}>login</button>
          </a>
        </div>);
    } else if (keyParam) {
      return '';
    } else {
      return (
        <a>
          <a className="navbar-brand" href='/profile'>hello, {host.firstName}</a>
          <button type="button" class="btn btn-dark" onClick={logout}>logout</button>
        </a>
      )
    }
  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-light bg-white width-100%">
          <div className='text-lg container mx-auto flex justify-between items-center'>
            <a className="navbar-brand" href='/'><img src={logo} alt="" width="5%" />Gift Registry System</a>
            {

            }
            {
              isLogin()
            }
          </div>
        </nav>
      </header>

    </div>
  )
}

export default HeaderComponent