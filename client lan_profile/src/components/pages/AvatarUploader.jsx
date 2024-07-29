import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import Cropper from "react-cropper";
import 'cropperjs/dist/cropper.css';

const file2Base64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.toString());
    reader.onerror = (error) => reject(error);
  });
};

const AvatarUploader = ({ setAvatar }) => {
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
    setAvatar(croppedImage);
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
          {cropped && <img src={cropped } style={{ height: 400, width: 400 }} alt="Cropped!" />}
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
