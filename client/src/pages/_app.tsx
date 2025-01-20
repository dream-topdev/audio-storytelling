import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from '../context/AuthContext';
import { useThemeMode } from '../hooks/useThemeMode';

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }
}: AppProps) {
  const { theme } = useThemeMode();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
} 