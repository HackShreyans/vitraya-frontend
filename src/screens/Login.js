import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', formData);
      console.log(response.data); 

      alert('you are login succefully');
      navigate('/image-upload');
    } catch (error) {
      console.error('Login failed:', error.message);
      
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <div style={styles.loginContainer}>
        <h1 style={styles.companyName}>Welcome to <span style={styles.companyNameHighlight}>Vitraya</span></h1>
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <h2 style={styles.heading}>Login</h2>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.loginButton}>Login</button>
          <p style={styles.registerText}>
            If you are new, <span onClick={navigateToRegister} style={styles.registerLink}>register here</span>.
          </p>
        </form>
      </div>
    </>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '2rem',
  },
  companyName: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  companyNameHighlight: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  loginForm: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    padding: '2rem',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  loginButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  loginButtonHover: {
    backgroundColor: '#0056b3',
  },
  registerText: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#555',
  },
  registerLink: {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
  }
};

export default Login;
