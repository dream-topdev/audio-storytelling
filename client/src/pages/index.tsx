import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Link as MuiLink, Typography } from '@mui/material';
import { Paper, useMediaQuery, useTheme } from '@mui/material';

import { useAuth } from '../context/AuthContext';
import { AudioTrack } from '../../../shared/types/audio';
import { api } from '../utils/api';
import AudioPlayer from '../components/AudioPlayer';
import Playlist from '../components/Playlist';
import Header from '../components/Header';
import AudioVisualizer from '../components/AudioVisualizer';
import { colors } from '../constants/colors';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isAuthenticated) {
      api.audio.getTracks()
        .then(data => {
          setTracks(data);
          if (data.length > 0 && !selectedTrack) {
            setSelectedTrack(data[0]);
          }
        })
        .catch(error => console.error('Failed to fetch tracks:', error));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.paper',
        color: 'secondary.contrastText',
        p: 3
      }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Audio Stories
        </Typography>
        <Typography variant="body1" gutterBottom>
          <NextLink href="/login" passHref>
            <MuiLink>Please log in</MuiLink>
          </NextLink>
          {' '}to access your personalized audio library.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      bgcolor: isDarkMode ? colors.background.dark : colors.background.light,
      color: isDarkMode ? colors.text.dark.primary : colors.text.light.primary,
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <Header isDarkMode={isDarkMode} onThemeToggle={() => setIsDarkMode(!isDarkMode)} />

      <Box sx={{
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden'
      }}>
        <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          {selectedTrack && (
            isMobile ? (
              <Playlist
                tracks={tracks}
                selectedTrack={selectedTrack} 
                onTrackSelect={setSelectedTrack}
                isDarkMode={isDarkMode}
              />
            ) : (
              <AudioVisualizer
                audioElement={document.querySelector('audio')}
                isDarkMode={isDarkMode}
              />
            )
          )}
        </Box>

        <Box sx={{
          width: { xs: '100%', md: '300px' },
          borderLeft: 1,
          borderColor: isDarkMode ? colors.shadow.dark : colors.shadow.light,
          display: { xs: 'none', md: 'block' }
        }}>
          <Playlist
            tracks={tracks}
            selectedTrack={selectedTrack}
            onTrackSelect={setSelectedTrack}
            isDarkMode={isDarkMode}
          />
        </Box>
      </Box>

      {selectedTrack && (
        <Paper
          elevation={3}
          sx={{
            bgcolor: isDarkMode ? colors.player.background.dark : colors.player.background.light,
            borderTop: 1,
            borderRadius: 0,
            borderColor: isDarkMode ? colors.shadow.dark : colors.shadow.light,
            zIndex: theme.zIndex.drawer + 1,
            backdropFilter: 'blur(8px)',
          }}
        >
          <AudioPlayer
            track={selectedTrack}
            isDarkMode={isDarkMode}
            tracks={tracks}
            onTrackChange={setSelectedTrack}
          />
        </Paper>
      )}
    </Box>
  );
}