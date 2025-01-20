import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography, 
  Paper,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { AudioTrack } from '../../../shared/types/audio';

interface PlaylistProps {
  tracks: AudioTrack[];
  selectedTrack: AudioTrack | null;
  onTrackSelect: (track: AudioTrack) => void;
  isDarkMode: boolean;
}

export default function Playlist({ tracks, selectedTrack, onTrackSelect, isDarkMode }: PlaylistProps) {
  return (
    <Paper sx={{ 
      bgcolor: isDarkMode ? '#242424' : '#f2f2f2',
      borderRadius: '0px',
      color: isDarkMode ? 'common.white' : '#3d3d3d',
      p: { xs: 1, sm: 2 },
      height: '100%',
    }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          px: 1,
          fontSize: { xs: '1rem', sm: '1.25rem' }
        }}
      >
        Playlist
      </Typography>
      <List sx={{ 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: isDarkMode ? '#1e1e1e' : '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: isDarkMode ? '#444' : '#888',
          borderRadius: '4px',
        },
      }}>
        {tracks.map((track) => (
          <ListItem 
            key={track.id}
            disablePadding
            sx={{
              bgcolor: selectedTrack?.id === track.id 
                ? (isDarkMode ? 'rgba(255,255,255,0.1)' : 'action.selected')
                : 'transparent',
              borderRadius: 1,
              mb: 0.5
            }}
          >
            <ListItemButton 
              onClick={() => onTrackSelect(track)}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  bgcolor: isDarkMode 
                    ? 'rgba(255,255,255,0.05)' 
                    : 'rgba(0,0,0,0.05)'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={track.thumbnail}
                  variant="rounded"
                  sx={{ 
                    width: 48, 
                    height: 48,
                    mr: 1
                  }}
                />
              </ListItemAvatar>
              <ListItemText 
                primary={track.title}
                secondary={track.artist}
                primaryTypographyProps={{
                  sx: { 
                    fontWeight: selectedTrack?.id === track.id ? 'bold' : 'normal'
                  }
                }}
                secondaryTypographyProps={{
                  sx: { color: isDarkMode ? 'grey.400' : 'text.secondary' }
                }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? 'grey.400' : 'text.secondary',
                  fontSize: '0.875rem'
                }}
              >
                {`${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}`}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
} 