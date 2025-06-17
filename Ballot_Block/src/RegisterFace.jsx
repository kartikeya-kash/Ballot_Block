import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterFace() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleUpload = () => {
    if (!image) return alert('Please select a photo');

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

  return (
    <div style={{
      padding: '40px',
      background: 'black',
      color: 'white',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px'
    }}>
      <h1 style={{ marginBottom: '20px' }}>Upload Your Face for Verification</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      
      {image && (
        <div style={{ marginTop: '20px' }}>
          <strong>Preview:</strong><br />
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }}
          />
        </div>
      )}

      <br /><br />
      <button
        onClick={handleUpload}
        style={{
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '18px'
        }}
      >
        Submit Photo
      </button>
    </div>
  );
}

export default RegisterFace;