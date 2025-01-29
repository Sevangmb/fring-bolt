import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

function EditClothingForm({ item, onUpdateItem, onCancel }) {
  const [name, setName] = useState(item.name);
  const [type, setType] = useState(item.type);
  const [color, setColor] = useState(item.color);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateItem({ ...item, name, type, color });
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
            Save
          </Button>
          <Button onClick={onCancel} variant="contained" color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditClothingForm;
