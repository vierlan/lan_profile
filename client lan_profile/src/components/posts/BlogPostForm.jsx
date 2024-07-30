import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import AuthContext from '../../api/AuthProvider';

const BlogPostForm = () => {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);
  const [blogImage, setBlogImage] = useState('');
  const navigate = useNavigate();

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
    const blogPost = { title, content: sections, user_id: auth.user.id };
    console.log('Blog post:', blogPost);
    const token = auth.token;
    console.log('Token:', token);

    try {
      if (blogImage) {
        blogPost.content.push({ type: 'image', content: blogImage });
      }
      console.log('Blog post after URL append:', blogPost);

      const response = await axios.post('http://localhost:3000/api/v1/blog_posts', blogPost, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status.toString().startsWith("20")) {
        console.log('Blog post created successfully', response.data);
        alert('Blog post created successfully');
        navigate('/profile');
        setTitle('');
        setSections([]);
        setBlogImage('');
      }
      else {
        setError(error.response ? error.response.data : 'An error occurred');
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred');
    }
  };

  return (
    <form >
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
      <ImageUploader setBlogImage={setBlogImage} />
      <button type="submit" onClick={handleSubmit} >Create Blog Post</button>
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
    case 'image':
      return (
        <div>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                onChange(reader.result);
              };
              reader.readAsDataURL(file);
            }}
          />
          {section.content && <img src={section.content} alt="Blog post" />}
        </div>
      );
    default:
      return null;
  }
};

export default BlogPostForm;
