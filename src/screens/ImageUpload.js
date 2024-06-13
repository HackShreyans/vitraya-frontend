import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    
    fetchImageData();
  }, []);

  const fetchImageData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/images');
      setImageData(response.data);
    } catch (error) {
      console.error('Failed to fetch image data:', error.message);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setLoading(true);
      await axios.post('http://localhost:8080/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload successful and filtered by OCR');
      
      setSelectedFile(null);
      setLoading(false);
     
      fetchImageData();
    } catch (error) {
      console.error('Image upload failed:', error.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Image Upload</h2>
      <label style={styles.label}>
        Select Image:
        <input type="file" onChange={handleFileChange} style={styles.fileInput} />
      </label>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={loading ? { ...styles.uploadButton, ...styles.uploadButtonDisabled } : styles.uploadButton}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      <div style={styles.imageList}>
        {imageData.map((data) => (
          <div key={data.id} style={styles.imageItem}>
            <img src={`data:image/jpeg;base64,${data.imageData}`} alt="Uploaded" style={styles.image} />
            <div style={styles.textContainer}>
              <h3 style={styles.textHeading}>Extracted Text:</h3>
              <p style={styles.text}>{data.extractedText}</p>
              <h3 style={styles.textHeading}>Bold Words:</h3>
              <p style={styles.text}>{data.boldWords}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '2px solid #007bff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    maxWidth: '700px',
    margin: '30px auto',
    transition: 'all 0.3s ease',
  },
  heading: {
    fontSize: '2rem',
    color: '#007bff',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '20px',
    color: '#555',
  },
  fileInput: {
    display: 'block',
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
  },
  uploadButton: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  uploadButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  imageList: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  imageItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    width: '100%',
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '350px',
    height: '200px',
    objectFit: 'cover',
    marginRight: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textHeading: {
    color: '#333',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  text: {
    color: '#666',
    lineHeight: '1.5',
  },
};

export default ImageUpload;
