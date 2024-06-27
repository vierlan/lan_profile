import React, { useState, useEffect } from 'react'
// API_URL comes from .env.development file
import { API_URL } from '../../constants'


function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// Fetch posts from the API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);

        } else {
          throw response;
        }
      } catch (error) {
        setError("error fetching data");
        console.log("error fetching data", error);
      } finally {
        setLoading(false);

      }
    }
    fetchPosts();
  }, []);


  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className='post-container'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export default PostsList
