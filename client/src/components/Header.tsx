import { Box, Typography, IconButton, Button } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { colors } from '../constants/colors';

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
      router.push('/');
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
      borderColor: isDarkMode ? colors.border.dark : colors.border.light,
      background: isDarkMode ? colors.gradient.header.dark : colors.gradient.header.light,
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
            color: isDarkMode ? colors.text.light.primary : colors.text.dark.primary,
            bgcolor: isDarkMode ? colors.button.dark : colors.button.light,
            '&:hover': {
              bgcolor: isDarkMode ? colors.button.hover.dark : colors.button.hover.light,
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
            color: isDarkMode ? colors.text.light.primary : colors.text.dark.primary,
            borderColor: isDarkMode ? colors.shadow.dark : colors.shadow.light,
            '&:hover': {
              borderColor: isDarkMode ? colors.shadow.dark : colors.shadow.light,
              bgcolor: isDarkMode ? colors.button.hover.dark : colors.button.hover.light,
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
} 