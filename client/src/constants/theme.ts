import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF69B4', // Hot pink
      light: '#FFB6C1', // Light pink
      dark: '#FF1493', // Deep pink
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFC0CB', // Pink
      light: '#FFE4E1', // Misty rose
      dark: '#DB7093', // Pale violet red
      contrastText: '#000000',
    },
    background: {
      default: '#FFF0F5', // Lavender blush
      paper: '#ffffff',
    },
    text: {
      primary: '#424242', // Softer black
      secondary: '#666666', // Softer gray
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(255, 105, 180, 0.25)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF69B4',
      light: '#FFB6C1',
      dark: '#FF1493',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFC0CB',
      light: '#FFE4E1',
      dark: '#DB7093',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#ffffff',
      secondary: '#B0B0B0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(255, 105, 180, 0.25)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
}); 