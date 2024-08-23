import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Register.css'; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    location: '',
    description: '',
    occupation: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8888/api/auth/signup', formData);
      console.log(response.data);
      navigate('/'); 
    } catch (error) {
      console.error('Error registering:', error); 
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          placeholder="Occupation"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
