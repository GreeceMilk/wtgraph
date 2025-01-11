import { Box, Slide, Typography, useScrollTrigger } from '@mui/material';
import React from 'react'


const PageTitle = ({text}) => {
const trigger = useScrollTrigger({threshold: 5});
  return (
    // <HideOnScroll>
    <Box sx={{height: trigger? '0px':'80px', transition: 'height 0.2s ease-in-out', alignContent: 'center', mb: 2, overflow: 'hidden'}}>
        <Typography variant='h4'>{text}</Typography>
    </Box>

    // </HideOnScroll>
  )
}

export default PageTitle
