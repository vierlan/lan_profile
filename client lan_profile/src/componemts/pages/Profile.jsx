import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../api/AuthProvider';

function Profile() {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("profile useeffect auth:", auth);
    if (auth.userData) {
      setUserData(auth.userData);
      setLoading(false);
      console.log("auth user data:", auth.userData);
    } else {
      console.log("fetch user data from server with auth token:", auth.token);
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/v1/current_user', {
            headers: {
              'Authorization': `Bearer ${auth.token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log("fetch user data response:", response);
          if (response.status===200) {
            const data = await response.json();
            setUserData(data);
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          setError('Error fetching data');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [auth.token, auth.userData]); // Depend on auth.userData as well

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {userData && (
        <>
          <p>Email: {userData.email}</p>
          <p>Username: {userData.username}</p>
        </>
      )}
    </div>
  );
}

export default Profile;
