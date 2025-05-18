import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import axios from 'axios';
import { LinearProgress, Stack } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setLoading(true);
    try {
      await axios.post('http://localhost:5555/api/users/register', { name, email, password });
      window.location.href = '/';
    } catch (err) {
      console.log(err);
      setError(err.response?.data.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#FF5B00',
        backgroundImage: 'linear-gradient(180deg, #FF5B00, #FFA500)',
      }}
    >
      {/* Left Side Features */}
      <Box
        sx={{
          width: '50%',
          padding: '5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h4" fontWeight={700} color="white">
          Join CountryRhymes Today!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/197/197471.png"
            alt="Globe"
            style={{ width: 30, height: 30 }}
          />
          <Typography variant="body1" color="white">
            Access exclusive country comparison tools
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/197/197471.png"
            alt="Globe"
            style={{ width: 30, height: 30 }}
          />
          <Typography variant="body1" color="white">
            Save your favorite travel destinations
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/197/197471.png"
            alt="Globe"
            style={{ width: 30, height: 30 }}
          />
          <Typography variant="body1" color="white">
            Get notified about new country data updates
          </Typography>
        </Box>
      </Box>

      {/* Right Side Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 5,
          borderRadius: 2,
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={3}>
          Sign Up
        </Typography>
        {error && (
          <Typography variant="body2" color="error" mb={2}>
            {error}
          </Typography>
        )}
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
        >
          Sign Up
        </Button>
        <Typography variant="body2" align="center" mt={2}>
          Already have an account?{' '}
          <Link href="/" underline="hover" color="primary">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;