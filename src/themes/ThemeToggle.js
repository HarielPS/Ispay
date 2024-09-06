"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import { useTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

function ThemeToggle({ toggleTheme }) {
  const theme = useTheme();  // Usar el tema actual

  return (
    <Box sx={{ maxWidth: '32px' }}>
      <Button
        variant="text"
        onClick={toggleTheme} // Cambiar el tema al hacer clic
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: '32px', height: '32px', p: '4px' }}
      >
        {theme.palette.mode === 'dark' ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" sx={{color:'#2c1357'}} />
        )}
      </Button>
    </Box>
  );
}

export default ThemeToggle;
