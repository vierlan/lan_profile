import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('API_URL:', API_URL);  // Debug log

    async function fetchPosts() {
      try {
        console.log('Fetching posts from:', API_URL);  // Debug log
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          throw response;
        }
      } catch (error) {
        setError('Error fetching data');
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts.map((post) => (
        <div key={post.id} className='post-container'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
