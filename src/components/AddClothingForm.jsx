import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

function AddClothingForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItem({ name, type, color });
    setName('');
    setType('');
    setColor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddClothingForm;
