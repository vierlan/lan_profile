// src/App.jsx
import { useState } from 'react';
import './App.css';
import PostsList from './components/posts/PostsList';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import BlogPostForm from './components/posts/BlogPostForm';
import SigninPage from './components/pages/SigninPage';
import SignupForm from './components/pages/SignupForm';
import Login from './components/pages/Login';
import { AuthProvider } from './api/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Animations from './components/pages/Animations';
import PostDetail from './components/posts/PostDetail';
import ProjectCreate from './components/pages/ProjectCreate';

function App() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  return (
    <AuthProvider avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PostsList />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/home" element={<Home />} />
            <Route path="/animations" element={<Animations />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/newproject" element={<ProjectCreate />} />
            <Route path="/new" element={<BlogPostForm />} />
            <Route path="/users/sign_in" element={<SigninPage />} />
            <Route path="/users/sign_up" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
