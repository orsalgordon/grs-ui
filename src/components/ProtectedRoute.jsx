import React from 'react';
import LoginComponent from './LoginComponent';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
   const isLoggedIn = window.localStorage.getItem("grsId");
  return isLoggedIn != undefined ? <Outlet /> : <LoginComponent />;
}

export default ProtectedRoute