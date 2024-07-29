// src/api/AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user_string');
    if (token && user) {
      const parsedUser = JSON.parse(user);
      setAuth({ token, user: parsedUser });
      setAvatarUrl(parsedUser.avatar_url);
      console.log('User loaded from localStorage:', parsedUser);
    }
  }, []);

  const logout = () => {
    setAuth(null);
    setAvatarUrl(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user_string');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, avatarUrl, setAvatarUrl }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
