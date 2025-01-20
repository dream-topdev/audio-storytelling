import { Box, Typography, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDarkMode, onThemeToggle }: HeaderProps) {
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
      <IconButton 
        onClick={onThemeToggle}
        sx={{ 
          color: isDarkMode ? 'common.white' : 'common.black',
          bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          '&:hover': {
            bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }
        }}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  );
} 