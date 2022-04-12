import React from 'react';
// Imports Material-UI
import Box from '@mui/material/Box';
// Imports
import { Clients, Employees } from './Pages';
import { Sidebar } from './Components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
      <BrowserRouter>
        <Box sx={{ gridArea: 'header', bgcolor: '#041317' }}></Box>
        <Box sx={{ gridArea: 'main' }}>
          {/* Rotas dentro do main */}

          <Routes>
            <Route path="/home" element={<></>}>
            </Route>
            <Route path="/clientes" element={<Clients />}>
            </Route>
            <Route path="/profissionais" element={<Employees />}>
            </Route>
          </Routes>

        </Box>
        <Box sx={{ gridArea: 'sidebar', bgcolor: '#041317' }}><Sidebar /></Box>
        <Box sx={{ gridArea: 'footer', bgcolor: '#041317' }}>Footer</Box>
      </BrowserRouter>
    </Box >
  );
}
