//client lan_profile/src/componemts/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from '../../api/AuthProvider';

function Login() {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");a
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [avatar, setAvatar] = useState(null);
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
        console.log(user)
        setAuth({ user, token });
        setEmail('');
        setPassword('');
        setAvatar('');
        localStorage.setItem('token', token);
        localStorage.setItem('avatar_url:', JSON.stringify(user.avatar_url));
        localStorage.setItem('user_string', JSON.stringify(user));
        console.log(response);
        alert(`Login successful! Welcome ${user.username}!`);
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
      <form>
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
        <button onClick={handleLogin}>Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}

export default Login;
