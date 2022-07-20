import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./assets/themeGlobal";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/pt-BR";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
   <React.Fragment>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <ThemeProvider theme={theme}>
         <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locale}
         >
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
               <App />
            </SnackbarProvider>
         </LocalizationProvider>
      </ThemeProvider>
   </React.Fragment>
);
