import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token); // Use the named import function
    const currentTime = Date.now() / 1000;
    console.log(decoded);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
};

const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  if (!user || isTokenExpired(user.token)) {
    console.log('Token expired or user not authenticated');
    return <Navigate to='/login' />;
  }

  return children;
};

export default RequireAuth;
