import { useState } from 'react'
import './App.css'
import PostsList from './componemts/posts/PostsList'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import Home from './componemts/pages/Home'
import Profile from './componemts/pages/Profile'
import BlogPostForm from './componemts/posts/BlogPostForm'
import SigninPage from './componemts/pages/SigninPage'
import SignupForm from './componemts/pages/SignupForm'
import Login from './componemts/pages/Login'
import { AuthProvider } from './api/AuthProvider'
import ProtectedRoute from './componemts/ProtectedRoute'


function App() {
  const [avatar, setAvatar] = useState(null)



  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout avatar={avatar} setAvatar={setAvatar}/>} >
            <Route path="/" element={<PostsList/>} />
            <Route path="/home" element={<Home/>} />
            <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
            <Route path="/new" element={<BlogPostForm/>}/>
            <Route path="/users/sign_in" element={<SigninPage/>}/>
            <Route path="/users/sign_up" element={<SignupForm/>}/>
            <Route path="/login" element={<Login/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}
export default App
