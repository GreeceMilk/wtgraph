import { AppBar, IconButton, Link, Toolbar, Typography, Grid2 as Grid, styled, Box } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {

  const CustomButton = styled(IconButton)(({theme}) => ({
    color: '#fff',
    opacity: 0.7,
  }));

  return (
    <AppBar position='static' id='footer'>
        <Toolbar variant='dense' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <Grid container sx={{width: '100%'}}>
          <Grid item size={{xs: 10, md:'grow'}} sx={{ alignContent: 'center'}}>
            <Typography variant='subtitle2' color='#fff' sx={{textAlign: 'left', opacity: 0.7}}>WTGRAPH is a passion project from Carter W. Many thanks to <Link href="https://github.com/ControlNet/wt-data-project.data" target="_blank" color='inherit'>wt-data-project</Link> for collecting and organizing data. </Typography>
          </Grid>
          <Grid item sx={{justifyContent: 'center', alignContent: 'center', textAlign: 'right'}} size={{xs: 2, md: 'auto'}}>
            <Box>

              <CustomButton href="https://github.com/GreeceMilk/wtgraph" target="_blank">
                  <GitHubIcon />
              </CustomButton>
              <CustomButton href="https://www.linkedin.com/in/carter-wang-0550262b4" target="_blank">
                  <LinkedInIcon />
              </CustomButton>
            </Box>

          </Grid>

        </Grid>
            
        </Toolbar>
    </AppBar>
  )
}

export default Footer
