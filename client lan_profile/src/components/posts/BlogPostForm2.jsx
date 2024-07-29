import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../api/AuthProvider';
import ImageUploader from './ImageUploader';
import { useNavigate } from 'react-router-dom';
import {Cloudinary} from "@cloudinary/url-gen";

const BlogPostForm = () => {
  const [cloudName] = useState("drirqdfbt");
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }

  });

  const myImage = cld.image(publicID);
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);
  const [blogImage, setBlogImage] = useState('');
  const navigate = useNavigate();
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
    const blogPost = { title, content: sections, user_id: auth.user.id };
    console.log(blogPost);
    try {
      if (blogImage) {
        const imageUrl = cld.image(blogImage).toURL();
        console.log('image url', imageUrl);
        blogPost.content.push({ type: 'image', content: imageUrl });
      }
      console.log('blogpost after url append', blogPost);
      const response = await axios.post('http://localhost:3000/api/v1/blog_posts', blogPost, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status.toString().startsWith("20")) {
        console.log('Blog post created successfully', response.data);
        alert('Blog post created successfully');

        // Redirect to profile page or show success message
        navigate('/profile');
        setTitle('');
        setSections([]);
        setBlogImage('');
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred');
    }
  };


  const uploadImageToCloudinary = async (blogImage) => {
    console.log('Uploading image to Cloudinary:', blogImage);
    const formData = new FormData();
    formData.append('file', blogImage);
    console.log('Form data1:', formData);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Use the Vite environment variable
    console.log('Form data2:', formData);
    try {
      const response = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);
      const imageUrl = response.data.secure_url;
      console.log('Image uploaded successfully:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };



  return (
    <form>
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
      <button type="submit" onClick={handleSubmit}>Create Blog Post</button>
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
            onChange={handleChange}
          />
          {section.content && <img src={section.content} alt="Blog post" />}
        </div>
      );
    default:
      return null;
  }
};

export default BlogPostForm;
