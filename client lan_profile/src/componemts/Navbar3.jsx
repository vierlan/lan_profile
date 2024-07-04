import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('http://localhost:3000/api/v1/auth/validate_token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        console.error('Token validation error', error);
        setIsAuthenticated(false);
      });
    }
  }, []);

  const handleSignOut = () => {
    const token = localStorage.getItem('authToken');
    axios.delete('http://localhost:3000/api/v1/auth/sign_out', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      }
    })
    .catch(error => {
      console.error('Sign out error', error);
    });
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><button onClick={handleSignOut}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="users/sign_up">Sign Up</Link></li>
            <li><Link to="users/sign_in">Sign In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
