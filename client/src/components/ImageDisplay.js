import { Box, Fade, Typography, styled } from '@mui/material'
import React, {useState} from 'react'

const ImageDisplay = ({image, mainText, subText}) => {
    const [hover, setHover] = useState(false);
    
    
  return (
    <Box 
      sx={{position: 'relative', height: '200px', width: '100%', p: 0,
          overflow: 'hidden',
          borderRadius: 1
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
        <img src={image} alt='image' style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)',
          display: 'block',
          transform: hover ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.3s ease-in-out',
        }}/>
        <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0,
            height: hover ? '100%' : '50%', 
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            transition: 'height 0.3s ease-in-out',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'column'}}>
                <Typography variant='h3' color='secondary'>{mainText}</Typography>
                <Fade in={hover}>
                    <Typography variant='h5' color='secondary'>{subText}</Typography>
                </Fade>
        </Box>


    </Box>

  )
}

export default ImageDisplay
