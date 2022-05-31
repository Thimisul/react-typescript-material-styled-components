import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme  from './assets/themeGlobal'

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);




root.render(
  <React.Fragment>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.Fragment>
);