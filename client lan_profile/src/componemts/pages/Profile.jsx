import React, { useState, useEffect } from 'react';
import TokenValidator from '../TokenValidator';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchUserData() {
      

      try {
        const response = await fetch('http://localhost:3000/api/v1/current_user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw response;
        }
      } catch (error) {
        setError('Error fetching data');
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <TokenValidator />
      <div>Profile</div>
      {userData && (
        <>
          <p>Email: {userData.email}</p>
        </>
      )}
    </>
  );
}

export default Profile;
