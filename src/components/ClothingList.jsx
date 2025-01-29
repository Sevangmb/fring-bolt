import React, { useState } from 'react';
import EditClothingForm from './EditClothingForm';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ClothingList({ items, onDeleteItem, onUpdateItem }) {
  const [editItemId, setEditItemId] = useState(null);

  const handleEditClick = (itemId) => {
    setEditItemId(itemId);
  };

  const handleEditCancel = () => {
    setEditItemId(null);
  };

  const handleUpdateItem = (updatedItem) => {
    onUpdateItem(editItemId, updatedItem);
    setEditItemId(null);
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item._id}>
          {editItemId === item._id ? (
            <EditClothingForm
              item={item}
              onUpdateItem={handleUpdateItem}
              onCancel={handleEditCancel}
            />
          ) : (
            <>
              <ListItemText
                primary={item.name}
                secondary={`${item.type} - ${item.color}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditClick(item._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteItem(item._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default ClothingList;
