import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClothingList from './components/ClothingList';
import AddClothingForm from './components/AddClothingForm';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import authService from './services/authService';
import db from './services/db';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      setIsLoggedIn(await authService.isLoggedIn());
      const items = await db.getAllClothingItems();
      setClothingItems(items);
    };
    initialize();
  }, []);

  const addClothingItem = async (item) => {
    const newItem = await db.addClothingItem(item);
    setClothingItems([...clothingItems, newItem]);
  };

  const deleteClothingItem = async (id) => {
    await db.deleteClothingItem(id);
    setClothingItems(clothingItems.filter((item) => item._id !== id));
  };

  const updateClothingItem = async (id, updatedItem) => {
    await db.updateClothingItem(id, updatedItem);
    setClothingItems(
      clothingItems.map((item) => (item._id === id ? updatedItem : item))
    );
  };

  const handleLogin = async (user) => {
    const success = await authService.login(user);
    if (success) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsLoggedIn(false);
  };

  const handleRegistration = async (user) => {
    await authService.register(user);
    setIsLoggedIn(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clothing Management App
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/clothing" />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/clothing" />
              ) : (
                <RegistrationForm onRegister={handleRegistration} />
              )
            }
          />
          <Route
            path="/clothing"
            element={
              isLoggedIn ? (
                <>
                  <AddClothingForm onAddItem={addClothingItem} />
                  <ClothingList
                    items={clothingItems}
                    onDeleteItem={deleteClothingItem}
                    onUpdateItem={updateClothingItem}
                  />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
