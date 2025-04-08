// src/pages/Home.jsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box 
        sx={{ 
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4
        }}
      >
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Welcome to F1 Store
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Your one-stop shop for F1 merchandise and race analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/store')}
          >
            Shop Now
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={() => navigate('/race-data')}
          >
            View Race Data
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
