
import { useState } from 'react';
import axios from 'axios';
import '../../assets/stylesheets/signupForm.scss';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate(); // Get navigate function for navigation

  const handleSignup = async (event) => {
    event.preventDefault();

    // Validate passwords before submitting
    if (!validatePasswords()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        user: {
          email,
          password,
          username
        }
      });

      // Handle successful response
      if(response.status === 200) {
        alert('Signup successful!');
        const token = response.data.data.jti;
        localStorage.setItem('token', token);
        console.log(response);
        console.log(response.data);
        console.log(response.data.data.jti);
        setSignupError(''); // Clear any previous error message
      // Optionally handle success message or redirect to profile page
        navigate('/profile'); // Navigate to profile page
      }
      else {
        console.log('Signup failed:', response);
        setSignupError('Signup failed. Please try again.');

      }
    } catch (error) {
      console.error('There was an error signing up!', error);
      // Handle error response
      if (error.response && error.response.data && error.response.data.status) {
        setSignupError(error.response.data.status.message);
      } else {
        setSignupError('An error occurred during signup.');
      }
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
      <form onSubmit={handleSignup}>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
