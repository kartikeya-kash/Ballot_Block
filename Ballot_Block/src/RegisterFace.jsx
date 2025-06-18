import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, UserCheck } from 'lucide-react';
import './RegisterFace.css';

function RegisterFace() {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const isValidFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const handleUpload = () => {
    if (!image) {
      alert('Please select or take a photo');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        localStorage.setItem('registeredFace', reader.result);
        alert('✅ Face registered successfully!');
        navigate('/vote');
      } else {
        alert('⚠️ Something went wrong. Could not read image.');
      }
    };
    reader.onerror = () => {
      alert('❌ Error reading the file');
    };
    reader.readAsDataURL(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      setImage(file);
    } else {
      alert('Invalid file. Please upload a PNG or JPG under 5MB.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      setImage(file);
    } else {
      alert('Invalid file. Please upload a PNG or JPG under 5MB.');
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(URL.createObjectURL(image));
      }
    };
  }, [image]);

  return (
    <div className="register-face-container">
      <div className="register-face-card">
        <div className="register-face-header">
          <div className="register-face-icon">
            <UserCheck className="button-icon" style={{ width: '40px', height: '40px' }} />
          </div>
          <h1 className="register-face-title">Face Registration</h1>
          <p className="register-face-subtitle">Upload your face for secure voting verification</p>
        </div>

        <div
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && triggerFileInput()}
        >
          {image ? (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="preview-image"
              />
              <p className="preview-text">Image selected</p>
            </div>
          ) : (
            <div className="upload-area-content">
              <Upload className="upload-icon" />
              <p className="upload-text">Drag & drop or click to upload</p>
              <p className="upload-subtext">PNG, JPG, or JPEG (max 5MB)</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFileChange}
            className="hidden-input"
          />
        </div>

        <div className="button-group">
          <button onClick={handleUpload} className="register-button">
            <UserCheck className="button-icon" />
            Register Face
          </button>

          <button onClick={triggerFileInput} className="photo-button">
            <Camera className="button-icon" />
            Take Photo
          </button>
        </div>

        <div className="security-notice">
          <p>Your face data is securely stored only on your device</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterFace;