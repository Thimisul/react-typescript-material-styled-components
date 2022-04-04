
import createTheme from '@mui/material/styles/createTheme';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f57c00',
      A100: '#f57c00'

    },
    secondary: {
      main: '#ffb74d',
    },
    background: {
      default: '#041317',
      paper: '#05191E',
    },
    divider: 'rgba(251,140,0,0.6)',
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
          thumb: {
            width: 24,
            height: 24,
          },
          track: {
            borderRadius: 13,
            border: '1px solid #bdbdbd',
            backgroundColor: '#fafafa',
            opacity: 1,
            transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          },

        }
      }
    },
    MuiAppBar: {
      defaultProps: {
        color: 'transparent'
      }
    }
  }
});