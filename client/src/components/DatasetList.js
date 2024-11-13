import React from 'react'
import { useEffect, useState } from 'react'
import {Box, TextField, List, ListItem, ListItemText, IconButton} from '@mui/material'
import {v4 as uuidv4} from 'uuid'
import ClearIcon from '@mui/icons-material/Clear';

const DatasetList = ({datasets, deleteItem}) => {
  useEffect(() => {
    console.log(datasets)
  }, [datasets])
  return (
    <div>
      <List>
        {datasets.filter((data) => data.saved).map((data) => (
          <ListItem key={data.id} secondaryAction={<IconButton edge="end" aria-label="delete" onClick={() => deleteItem(data.id)}>
            <ClearIcon />
          </IconButton>}>
            <ListItemText primary={data.label} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default DatasetList
