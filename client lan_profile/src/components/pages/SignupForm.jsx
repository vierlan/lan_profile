import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AvatarUploader from './AvatarUploader';
import '../../assets/stylesheets/signupForm.scss';
import AuthContext from '../../api/AuthProvider';

const SignUpForm = () => {
  const { setAuth, setAvatarUrl } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log('avatar', avatar);

    if (!validatePasswords()) {
      return;
    }

    const formData = new FormData();
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    formData.append('user[username]', username);
    const filename = `${username}-avatar.jpg`;
    formData.append('user[avatar_url]', avatar, filename);

    if (avatar) {
      formData.append('user[avatar_url]', avatar, 'avatar.jpg');
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        const token = response.headers.authorization.split(' ')[1];
        const user = response.data.user;
        setAuth({ user, token });
        setAvatarUrl(user.avatar_url);
        setEmail('');
        setPassword('');
        localStorage.setItem('token', token);
        localStorage.setItem('user_string', JSON.stringify(user));
        alert(`Signup successful! Welcome ${user.username}!`);
        navigate('/profile');
      } else {
        setSignupError('Signup failed. Please try again.');
      }
    } catch (error) {
      setSignupError('An error occurred during signup.');
    }
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordsMatchError(true);
      return false;
    } else {
      setPasswordsMatchError(false);
      return true;
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      {signupError && <div className="error-message">{signupError}</div>}
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        {passwordsMatchError && <div className="error-message">Passwords do not match</div>}
        <AvatarUploader setAvatar={setAvatar} />
        <button type="submit" onClick={handleSignup}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
