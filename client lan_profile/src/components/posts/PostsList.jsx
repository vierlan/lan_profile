import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import Post from './Post';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${API_URL}/api/v1/blog_posts`, {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Parse the content field if it is a JSON string
          const parsedData = data.map(post => ({
            ...post,
            content: typeof post.content === 'string' ? JSON.parse(post.content) : post.content,
          }));
          setPosts(parsedData);
          console.log(parsedData);
        } else {
          throw response;
        }
      } catch (error) {
        setError('Error fetching data');
        console.error(error);
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
          <Post post={post} key={post.id} />
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
