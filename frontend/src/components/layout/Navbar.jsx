// src/components/layout/Navbar.jsx
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          F1 Store
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/store"
          >
            Store
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/race-data"
          >
            Race Data
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/cart"
          >
            Cart
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Fix the export - it was exporting Layout instead of Navbar
export default Navbar;
