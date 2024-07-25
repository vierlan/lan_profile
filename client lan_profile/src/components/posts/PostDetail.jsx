import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../constants';
import Post from './Post';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`${API_URL}/${postId}`, {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          throw response;
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {post && <Post post={post} />}
    </>
  );
}

export default PostDetail;
