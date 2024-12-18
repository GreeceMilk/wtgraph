import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab, Fade } from '@mui/material';

const StyledFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
}));

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    function toggleVisibility() {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
        window.removeEventListener('scroll', toggleVisibility);
    };
    
    }, [])
    

    return (
        <Fade in={isVisible}>
            <StyledFab size='medium' onClick={scrollToTop} color='secondary'>
                <KeyboardArrowUpIcon />
            </StyledFab>
        </Fade>
    )
}

export default ScrollToTop
