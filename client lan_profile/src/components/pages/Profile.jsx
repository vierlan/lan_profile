// src/components/pages/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../api/AuthProvider';
import Projects from '../posts/Projects';
import ProfileData from '../posts/ProfileData';

function Profile() {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth && auth.token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/v1/current_user', {
            headers: {
              'Authorization': `Bearer ${auth.token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
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
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page">
      <ProfileData userData={userData}/>
      <Projects />
    </div>
  );
}

export default Profile;
