import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import Post from './Post';
import { Link } from 'react-router-dom';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/blog_posts', {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          throw response;
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <div className='blog-container'>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <Post post={post} />
          </Link>
        ))}
      </div>
      <div className="right-container">
        <div className="blog-card">
          {/* Additional content here */}
        </div>
        <p>some text</p>
      </div>
    </>
  );
}

export default PostsList;
