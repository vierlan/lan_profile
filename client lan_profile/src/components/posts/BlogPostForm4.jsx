import React, { useState } from 'react';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [subheader, setSubheader] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${baseUrl}/login`;
    fetch(url)
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/v1/blog_posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        blog_post: {
          title,
          content: {
            subheader,
            body,
          },
        },
      }),
    });

    if (!response.ok) {
      console.error('Failed to create blog post', response);
      setError('Failed to create blog post');
      return;
    }

    const data = await response.json();
    console.log('Blog post created:', data);
    // Reset form fields after successful submission
    setTitle('');
    setSubheader('');
    setBody('');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Subheader</label>
        <input
          type="text"
          value={subheader}
          onChange={(e) => setSubheader(e.target.value)}
        />
      </div>
      <div>
        <label>Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button type="submit">Create Blog Post</button>
    </form>
  );
};

export default BlogPostForm;
