import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

import { colors } from '../constants/colors';

interface AudioVisualizerProps {
  audioElement: HTMLAudioElement | null;
  isDarkMode: boolean;
}

export default function AudioVisualizer({ audioElement, isDarkMode }: AudioVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    console.log({audioElement})
    if (!audioElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    
    return () => {
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
    };
  }, [audioElement]);

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%',
      bgcolor: isDarkMode ? colors.player.background.dark : colors.player.background.light,
      borderRadius: 2,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <GraphicEqIcon sx={{ 
        fontSize: 64,
        color: isDarkMode ? colors.text.light.secondary : colors.text.dark.secondary,
        animation: isPlaying ? 'pulse 1s ease-in-out infinite' : 'none',
        '@keyframes pulse': {
          '0%': { opacity: 0.3 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.3 },
        },
      }} />
    </Box>
  );
} 