import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setIsLoading(true);
    setError('');
    setCaption('');

    try {
      const response = await axios.post('/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCaption(response.data.caption);
      setError('');
    } catch (error) {
      setError('Error uploading image: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload and Get Caption</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {caption && <p>Caption: {caption}</p>}
    </div>
  );
};

export default ImageUpload;