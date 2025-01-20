import { StrictMode, useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { AuthProvider } from '../context/AuthContext';
import { useThemeMode } from '../hooks/useThemeMode';

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }
}: AppProps) {
  const { theme } = useThemeMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration issues by only rendering once mounted
  if (!mounted) {
    return null;
  }

  return (
    <StrictMode>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  );
} 