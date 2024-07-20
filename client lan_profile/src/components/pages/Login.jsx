// src/components/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../api/AuthProvider';

function Login() {
  const { setAuth, setAvatarUrl } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        user: { email, password }
      });
      if (response.status === 200) {
        const token = response.headers.authorization;
        const user = response.data.user;
        setAuth({ user, token });
        setAvatarUrl(user.avatar_url);
        localStorage.setItem('token', token);
        localStorage.setItem('user_string', JSON.stringify(user));
        navigate('/profile');
      } else {
        setLoginError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('There was an error Logging in!', error);
      setLoginError('An error occurred during Login.');
    }
  };

  return (
    <div className="sign-up-form">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}

export default Login;
