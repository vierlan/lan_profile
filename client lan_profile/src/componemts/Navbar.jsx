import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom'
import lan from '../assets/images/lan.png'


function Navbar() {


  return (
   <div className="Navbar">
    <div className="leftside">
      <Link to ="/" ><button>Home</button></Link>
      <Link to ="/profile" ><button>Profile</button></Link>
      <Link to ="/new" ><button>New Post</button></Link>
      <Link to ="/users/sign_in" ><button>Sign in</button></Link>
      <Link to ="/users/sign_up" ><button>Sign up</button></Link>
      <Link to ="/login" ><button>Login</button></Link>
      </div>
    <div className="rightside">
      <img src={lan} alt="avatar" className="avatar" />
    </div>
   </div>

  )
}

export default Navbar
