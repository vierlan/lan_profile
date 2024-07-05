// src/components/TokenValidator.jsx
import React, { useEffect } from 'react';
import { getAuthToken } from '../utils/auth';

function TokenValidator() {
  useEffect(() => {
    async function checkToken() {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/v1/current_user', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            alert(`Token is valid. Welcome, ${data.username}!`);
          } else {
            const error = await response.json();
            console.log(response);
            alert(`Token is invalid: ${error.error}`);
          }
        } catch (error) {
          console.error('Error validating token:', error);
          alert('Error validating token');
        }
      } else {
        alert('No token found');
      }
    }

    checkToken();
  }, []);

  return null; // This component does not render anything visible
}

export default TokenValidator;
