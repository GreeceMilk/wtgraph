import React from 'react';
import { useEffect, useState } from 'react';
import {Box, TextField, List, ListItemButton, ListItemText, IconButton, alpha, ListItem} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import useTheme from '@mui/material/styles/useTheme';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const DatasetList = ({datasets, switchVisibility, deleteItem, setSelectedVehicleName}) => {
  useEffect(() => {
    console.log(datasets)
  }, [datasets])

  const theme = useTheme();

  function getItemBackgroundColor() {
    return alpha(theme.palette.primary.main, 0.1);
  }

  function visibilityButton(id) {
    let isHidden = datasets.find((data) => data.id === id).hidden;
    return (
      <IconButton edge="end" aria-label="visibility" onClick={() => switchVisibility(id)}>
        {isHidden?<VisibilityOffIcon />:<VisibilityIcon/>}
      </IconButton>
  )
}

  return (
    <Box sx={{height: "100%"}}>
      <List sx={{
        maxHeight: "500px",
        overflow: "auto"
      }}>
        {datasets.filter((data) => data.saved).map((data) => (
            <ListItem key={data.id} divider disablePadding
              secondaryAction={
                <>
                  {visibilityButton(data.id)}
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(data.id)}>
                    <ClearIcon />
                  </IconButton>
                </>
              }>
              <ListItemButton onClick={() => setSelectedVehicleName(data?.vehicleName)}>
                <ListItemText primary={data.label} />
              </ListItemButton>
            </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default DatasetList;
