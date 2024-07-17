import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import AvatarUploader from './AvatarUploader';
import '../../assets/stylesheets/signupForm.scss';
import AuthContext from '../../api/AuthProvider';


const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  //const [avatar, setAvatar] = useState(null);
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [signupError, setSignupError] = useState('');
  const { setAuth } = useContext(AuthContext);
  //const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        user: {
          email,
          password,
          username,
        //  avatar_url: avatar
        }
      });

      if (response.status === 200) {

        const token = response.headers.authorization.split(' ')[1];
        const user = response.data.user;
        setAuth({ user, token });
        setEmail('');
        setPassword('');
        localStorage.setItem('token', token);
        localStorage.setItem('loginuser', user);
        localStorage.setItem('user_string', JSON.stringify(user));
        console.log(response);
        alert(`Login successful! Welcome ${user.username}!`);
        navigate('/profile');







        console.log('Signup successful!');
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
          {/*<AvatarUploader onAvatarChange={setAvatar} />*/}
        <button type="submit" onClick={handleSignup}>Sign Up</button>
      </form>
    {/*{avatar ? <p>{avatar}</p> : null}*/ }
    </div>
  );
};

export default SignUpForm;
