import React from 'react';
// Imports Material-UI
import Box from '@mui/material/Box';
// Imports
import { Agreements, Cashier, Clients, Employees, ServicesSaloon, ScheduleAldabil,Login } from './Pages';
import { Sidebar } from './Components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from './Pages/Charts';

export default function App() {

   const logged: boolean = true
if(logged){
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
            <Route path="/clients" element={<Clients />}>
            </Route>
            <Route path="/employees" element={<Employees />}>
            </Route>
            <Route path="/services" element={<ServicesSaloon />}>
            </Route>
            <Route path="/agreements" element={<Agreements />}>
            </Route>
            <Route path="/cashier" element={<Cashier />}>
            </Route>
            <Route path="/schedule" element={<ScheduleAldabil />}>
            </Route>
            <Route path="/reports" element={<Chart />}>
            </Route>
          </Routes>

        </Box>
        <Box sx={{ gridArea: 'sidebar', bgcolor: '#041317' }}><Sidebar /></Box>
        <Box sx={{ gridArea: 'footer', bgcolor: '#041317' }}>Footer</Box>
      </BrowserRouter >
    </Box >
  )} else{
   return(

      <Login></Login>
   )
  }
}
