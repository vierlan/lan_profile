// src/api/FetchAvatar.jsx
import React, { useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import PropTypes from 'prop-types';
import lan from '../assets/images/lan.png';

const FetchAvatar = () => {
  const { auth, avatarUrl } = useContext(AuthContext);

  useEffect(() => {
    // Optional: additional logic if needed
  }, [avatarUrl]);

  return (
    <div className="avatar">
      {auth && avatarUrl ? (
        <img src={avatarUrl} alt="avatar" className="avatar" />
      ) : (
        <img src={lan} alt="default avatar" className="avatar" />
      )}
    </div>
  );
}

FetchAvatar.propTypes = {
  avatarUrl: PropTypes.string,
  setAvatarUrl: PropTypes.func,
  auth: PropTypes.object
}

export default FetchAvatar;
