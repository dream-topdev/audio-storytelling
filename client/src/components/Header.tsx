import { Box, Typography, IconButton, Button } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      p: { xs: 2, sm: 3 },
      borderBottom: 1,
      borderColor: isDarkMode ? 'rgba(255,105,180,0.2)' : 'rgba(255,105,180,0.1)',
      background: isDarkMode 
        ? 'linear-gradient(180deg, rgba(255,105,180,0.1) 0%, rgba(18,18,18,0) 100%)'
        : 'linear-gradient(180deg, rgba(255,105,180,0.05) 0%, rgba(255,255,255,0) 100%)',
    }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '2rem' }
        }}
      >
        Audio Library
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton 
          onClick={onThemeToggle}
          sx={{ 
            color: isDarkMode ? 'common.white' : '#3d3d3d',
            bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            '&:hover': {
              bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            }
          }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            color: isDarkMode ? 'common.white' : '#3d3d3d',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            '&:hover': {
              borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
} 