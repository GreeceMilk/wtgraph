import React from 'react';
import { alpha, useTheme, Box, Typography } from '@mui/material';

const InfoItem = ({name, content}) => {
    const theme = useTheme();

  return (
    <Box>
        <Typography variant="subtitle2" sx={{ color: alpha(theme.palette.text.primary, 0.3) }}>{name}</Typography>
        <Typography variant="body1" sx={{fontWeight: 500}}>{content}</Typography>
    </Box>
  )
}

export default InfoItem
