import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterFace.css';


function RegisterFace() {
  const [image, setImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (!image) {
      alert('Please select or take a photo');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        localStorage.setItem('registeredFace', reader.result as string);
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (