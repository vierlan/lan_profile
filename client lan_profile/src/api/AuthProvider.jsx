// src/api/AuthProvider.js// src/api/AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';
import {Proptypes} from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children, avatarUrl, setAvatarUrl }) => {
  const [auth, setAuth] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user_string');
    const avatarUrl = localStorage.getItem('avatarUrl:');
    setAvatarUrl(avatarUrl)
    if (token && user) {
      setAuth({ token, user });
      setAvatarUrl(user.avatarUrl);
      console.log(user.avatarUrl);
      console.log("auth1", auth);
    }
    console.log("auth2")
  }, []);

  const logout = () => {
    setAuth(null);
    setAvatarUrl(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');

  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, avatarUrl, setAvatarUrl}}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthContext;
