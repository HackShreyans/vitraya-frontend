import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import ImageUpload from './screens/ImageUpload';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set the root path to render the Login component */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/image-upload" element={<ImageUpload />} />
      </Routes>
    </Router>
  );
};

export default App;
