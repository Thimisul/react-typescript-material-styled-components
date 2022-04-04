import React from 'react';
// Imports Material-UI
import Box from '@mui/material/Box';
// Imports P
import { Clients } from './Pages';
import { Sidebar } from './Components';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';


export default function App() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 0,
        gridTemplateRows: 'auto',
        gridTemplateAreas:
          `"header header header header header header"
           "sidebar main main main main main"
           "footer footer footer footer footer footer"`,
      }}
    >
      <Box sx={{ gridArea: 'header', bgcolor: '#041317' }}></Box>
      <Box sx={{ gridArea: 'main' }}><Clients /></Box>
      <Box sx={{ gridArea: 'sidebar', bgcolor: '#041317' }}><Sidebar /></Box>
      <Box sx={{ gridArea: 'footer', bgcolor: '#041317' }}>Footer</Box>
    </Box >
  );
}
