import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        user: {
          email,
          password
        },
      });

      if(response.status === 200) {


        const token = response.headers.authorization;
        localStorage.setItem('token', token);
        console.log(response.data.user.username);
        console.log(response);
        localStorage.setItem("user",response.data.user.username);
        setUserData(response.data.user);
        const { username, ...rest } = response.data.user;
        alert(`Login successful! Welcome ${userData}! `);
        console.log(userData);
        console.log("Username", username);
        console.log("Rest", rest);

        setLoginError(''); // Clear any previous error message
      // Optionally handle success message or redirect to profile page
       // navigate('/'); // Navigate to profile page
      }
      else {
        console.log('Login failed:', response);
        setLoginError('Login failed. Please try again.');

      }
    } catch (error) {
      console.error('There was an error Logging in!', error);
      // Handle error response
      if (error.response && error.response.data && error.response.data.status) {
        setLoginError(error.response.data.status.message);
      } else {
        setLoginError('An error occurred during Login.');
        console.log('Login failed:', loginError);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("Tokens have been removed");
    navigate("/Login");
  }


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
        <button onClick={handleLogin}>Logout</button>
        <button onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

export default Login;
