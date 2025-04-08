// frontend/src/components/store/CartItem.jsx
import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item, dispatch }) => {
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: item.id, quantity: newQuantity }
      });
    }
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.id });
  };

  return (
    <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
      <Box
        component="img"
        sx={{ width: 100, height: 100, objectFit: 'cover', mr: 2 }}
        src={item.imageUrl}
        alt={item.name}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ${item.price}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <TextField
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            sx={{ width: 60 }}
          />
          <Typography sx={{ ml: 2 }}>
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={handleRemove} color="error">
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default CartItem;
