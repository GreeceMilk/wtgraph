import React from 'react';
import { useEffect, useState } from 'react';
import {Box, TextField, List, ListItem, ListItemText, IconButton, alpha, Icon} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import useTheme from '@mui/material/styles/useTheme';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const DatasetList = ({datasets, switchVisibility, deleteItem}) => {
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
    <div>
      <List>
        {datasets.filter((data) => data.saved).map((data) => (
            <ListItem key={data.id} divider sx={{":hover": {backgroundColor: getItemBackgroundColor()}, "transition": "background-color 0.2s"}}
              secondaryAction={
                <>
                  {visibilityButton(data.id)}
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(data.id)}>
                    <ClearIcon />
                  </IconButton>
                </>
              }>
              <ListItemText primary={data.label} />
            </ListItem>
        ))}
      </List>
    </div>
  )
}

export default DatasetList;
