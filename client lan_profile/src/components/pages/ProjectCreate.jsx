import React, { useContext, useState } from 'react'
import AuthContext from '../../api/AuthProvider';
import ImageUploader from '../posts/ImageUploader';
import axios from 'axios';

function ProjectCreate() {
  const { auth } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [projectImage, setProjectImage] = useState('');

  const token = localStorage.getItem('token');

  const handleImageUpload = (imageUrl) => {
    setProjectImage(imageUrl);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const project = { name, description, content, image: projectImage };
    try {
      const response = await axios.post('http://localhost:3000/api/v1/projects', project, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status.toString().startsWith("20")) {
        console.log('Project created successfully', response.data);
        // Redirect to profile page or show success message
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred');
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <ImageUploader onImageUpload={handleImageUpload} />
      <button type="submit" onClick={handleSubmit}>Create Project</button>
    </div>
  )
}

export default ProjectCreate
