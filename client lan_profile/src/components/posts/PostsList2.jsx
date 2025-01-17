import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import pic from '../../assets/images/10.jpg';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('API_URL:', API_URL);  // Debug log

    async function fetchPosts() {
      try {
        console.log('Fetching posts from:', API_URL);  // Debug log
        const response = await fetch('http://localhost:3000/api/v1/blog_posts', {



        });
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
    <>
      <div className='blog-container'>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {posts.map((post) => (
          <div className="blog-content" key={post.id}>
            <div className='blog-image'>
              <img src={pic} alt={post.title} />
              {post.user && <p>Written by: {post.user.username}</p>}
              <p>written on: {post.created_at} </p>

            </div>
            <div className='blog-text'>
              <h2>{post.title}</h2>
              <h4>{post.content.subheader}</h4>
              <p>{post.content.body}</p> {/* Access the body field */}
            </div>
          </div>
        ))}
      </div>
      <div className="right-container">
        <div className="project-card">
          {/* Additional content here */}
        </div>
        <p>some text</p>
      </div>
    </>
  );
}

export default PostsList;
