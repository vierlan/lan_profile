import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import lan from '../assets/images/lan.png';
import AuthContext from '../api/AuthProvider';
import FetchAvatar from '../api/FetchAvatar';

function Navbar() {
  const { auth, logout, avatar } = useContext(AuthContext);


  return (
    <div className="Navbar">
      <div className="leftside">
        <Link to="/"><button>Home</button></Link>
        <Link to="/profile"><button>Profile</button></Link>
        <Link to="/new"><button>New Post</button></Link>
        <Link to="/animations"><button>Animations</button></Link>
        <Link to="/newproject"><button>Add Project</button></Link>
        {!auth ? (
          <>
            <Link to="/newproject"><button>Add Project</button></Link>
            <Link to="/users/sign_in"><button>Sign in</button></Link>
            <Link to="/users/sign_up"><button>Sign up</button></Link>
            <Link to="/login"><button>Login</button></Link>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
      <div className="rightside">
          <FetchAvatar/>
      </div>
    </div>
  );
}

export default Navbar;
