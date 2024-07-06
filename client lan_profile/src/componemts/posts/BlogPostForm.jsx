import React, { useState } from 'react';
import axios from 'axios';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const handleAddSection = (type) => {
    setSections([...sections, { type, content: '' }]);
  };

  const handleSectionChange = (index, newContent) => {
    const newSections = sections.map((section, i) =>
      i === index ? { ...section, content: newContent } : section
    );
    setSections(newSections);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const blogPost = { title, content: sections };

    try {
      // const token = localStorage.getItem('authToken'); // Adjust based on your auth setup
      console.log(blogPost);
      const response = await axios.post('http://localhost:3000/api/v1/blog_posts', blogPost, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Adjust based on your auth setup
        },
      });

      if (response.status.toString().startsWith("20")) {
        // Handle successful creation (e.g., redirect or display success message)
        console.log('Blog post created successfully', response.data);
      }
    } catch (error) {
      // Handle error (e.g., set error state to display error message)
      setError(error.response ? error.response.data : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <div>
        {sections.map((section, index) => (
          <SectionEditor
            key={index}
            section={section}
            onChange={(newContent) => handleSectionChange(index, newContent)}
          />
        ))}
      </div>
      <button type="button" onClick={() => handleAddSection('subheader')}>Add Subheader</button>
      <button type="button" onClick={() => handleAddSection('body')}>Add Body</button>
      <button type="submit">Create Blog Post</button>
    </form>
  );
};

const SectionEditor = ({ section, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  switch (section.type) {
    case 'subheader':
      return (
        <input
          type="text"
          value={section.content}
          onChange={handleChange}
          placeholder="Subheader"
        />
      );
    case 'body':
      return (
        <textarea
          value={section.content}
          onChange={handleChange}
          placeholder="Body"
        />
      );
    // Add other cases for different section types
    default:
      return null;
  }
};

export default BlogPostForm;
