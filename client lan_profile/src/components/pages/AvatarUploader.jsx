import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import Cropper from "react-cropper";
import 'cropperjs/dist/cropper.css';

const AvatarUploader = ({ setAvatar }) => {
  const fileRef = createRef();
  const [uploaded, setUploaded] = useState(null);
  const [cropped, setCropped] = useState(null);
  const cropperRef = createRef();

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const blob = new Blob([reader.result], { type: file.type, size: file.size });
        alert(`IMG Type: ${file.type}, Size: ${file.size}`);
        setUploaded(URL.createObjectURL(blob));
        setAvatar(blob); // Set the avatar to the uploaded image as a blob
      };
      reader.onerror = (error) => console.error('Error reading file:', error);
    }
  };

  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const onCrop = () => {
    const imageElement = cropperRef.current;
    const cropper = imageElement.cropper;
    const croppedImage = cropper.getCroppedCanvas().toDataURL();
    console.log('Cropped Image:', croppedImage);
    const blob = base64ToBlob(croppedImage);
    setCropped(croppedImage);
    setAvatar(blob);
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
            Upload Avatar
          </button>
        </>
      )}
    </div>
  );
};

AvatarUploader.propTypes = {
  setAvatar: PropTypes.func.isRequired,
};

export default AvatarUploader;
