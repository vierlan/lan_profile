// src/api/AuthProvider.js// src/api/AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setAuth({ token, user });
      console.log("auth1", auth)
    }
    console.log("auth2")
  }, []);

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
    // Perform any additional logout logic here
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
