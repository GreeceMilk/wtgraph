import { Box, Slide, Typography, useScrollTrigger } from '@mui/material';
import React, { useEffect, useState } from 'react'

const defaultHeight = 84;

const PageTitle = ({text}) => {
  const [height, setHeight] = useState(defaultHeight);

  function updateHeight() {
    setHeight(Math.max(0, defaultHeight - window.scrollY));
  }

  useEffect(() => {
  window.addEventListener('scroll', updateHeight);
  return () => {
      window.removeEventListener('scroll', updateHeight);
  };
  }, [])
  return (
    <Box sx={{maxHeight: `${defaultHeight}px`, height: `${height}px`, alignContent: 'center', mb: 2, overflow: 'hidden'}}>
        <Typography variant='h4'>{text}</Typography>
    </Box>
  )
}

export default PageTitle
