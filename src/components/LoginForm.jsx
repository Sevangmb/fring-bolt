import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Link } from '@mui/material';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { username, password };
    await onLogin(user);
    navigate('/clothing');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Link component="button" variant="body2" onClick={() => navigate('/register')}>
            Register
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
