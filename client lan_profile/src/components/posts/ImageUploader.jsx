import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import Cropper from "react-cropper";
import 'cropperjs/dist/cropper.css';
import axios from 'axios';

const file2Base64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.toString());
    reader.onerror = (error) => reject(error);
  });
};

const ImageUploader = ({ onImageUpload }) => {
  const fileRef = createRef();
  const [uploaded, setUploaded] = useState(null);
  const [cropped, setCropped] = useState(null);
  const cropperRef = createRef();

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      file2Base64(file).then((base64) => {
        setUploaded(base64);
      });
    }
  };

  const onCrop = () => {
    const imageElement = cropperRef.current;
    const cropper = imageElement.cropper;
    const croppedImage = cropper.getCroppedCanvas().toDataURL();
    setCropped(croppedImage);
    uploadImageToCloudinary(croppedImage);
  };

  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData); // Replace with your Cloudinary URL
      const imageUrl = response.data.secure_url;
      onImageUpload(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      {uploaded ? (
        <div>
          <Cropper
            src={uploaded}
            style={{ height: 400, width: 400 }}
            autoCropArea={1}
            aspectRatio={1}
            viewMode={3}
            guides={false}
            ref={cropperRef}
          />
          <button onClick={onCrop}>Crop</button>
          {cropped && <img src={cropped} style={{ height: 400, width: 400 }} alt="Cropped!" />}
        </div>
      ) : (
        <>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileRef}
            onChange={onFileInputChange}
            accept="image/png,image/jpeg,image/gif"
          />
          <button onClick={() => fileRef.current.click()}>
            Upload Image
          </button>
        </>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUploader;
