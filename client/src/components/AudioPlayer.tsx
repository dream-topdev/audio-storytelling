import { useRef, useEffect, useState } from 'react';
import { 
  Box, 
  IconButton, 
  Slider, 
  Typography, 
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { AudioTrack } from '../../../shared/types/audio';
import { formatTime } from '../utils/time';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Repeat as RepeatIcon,
  RepeatOne as RepeatOneIcon,
  Forward10 as Forward10Icon,
  Replay10 as Replay10Icon,
} from '@mui/icons-material';

interface AudioPlayerProps {
  track: AudioTrack;
  tracks: AudioTrack[];
  isDarkMode?: boolean;
  onTrackChange?: (track: AudioTrack) => void;
}

type RepeatMode = 'none' | 'all' | 'one';

export default function AudioPlayer({ track, tracks, isDarkMode, onTrackChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastVolumeRef = useRef<number>(1);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('none');
  
  const {
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    duration,
    play,
    pause,
    setCurrentTime,
    setVolume,
    setDuration,
  } = useAudioPlayer(tracks, track);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const textColor = isDarkMode ? 'common.white' : '#3d3d3d';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (!currentTrack?.url) {
        console.warn('No audio URL provided'); 
        return;
      }
      
      const wasPlaying = isPlaying;
      const previousTime = audioRef.current.currentTime;
      
      audioRef.current.src = currentTrack.url;
      audioRef.current.currentTime = previousTime;
      
      if (wasPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          pause();
          if (error.name === 'NotSupportedError') {
            console.error('Audio format not supported or source unavailable');
          }
        });
      }
    }
  }, [currentTrack?.url, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const time = newValue as number;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const handlePlayPause = () => {
    if (!currentTrack?.url) {
      console.warn('Cannot play: No audio source available');
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current?.pause();
        pause();
      } else {
        // Store current time before playing
        const currentTimeBeforePlay = audioRef.current?.currentTime || 0;
        
        const playPromise = audioRef.current?.play();
        if (playPromise) {
          playPromise.then(() => {
            play();
            // Ensure we maintain the current time position
            if (audioRef.current) {
              audioRef.current.currentTime = currentTimeBeforePlay;
            }
          }).catch((error) => {
            console.error('Error playing/pausing audio:', error);
            pause();
          });
        }
      }
    } catch (error) {
      console.error('Error playing/pausing audio:', error as Error);
      pause();
    }
  };

  const toggleRepeat = () => {
    const modes: RepeatMode[] = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
    
    if (audioRef.current) {
      audioRef.current.loop = nextMode === 'one';
    }
  };

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.error('Error replaying audio:', error);
        });
      }
    } else if (repeatMode === 'all') {
      if (tracks.indexOf(currentTrack!) === tracks.length - 1) {
        const firstTrack = tracks[0];
        play(firstTrack);
        onTrackChange?.(firstTrack);
      } else {
        const nextTrack = tracks[tracks.indexOf(currentTrack!) + 1];
        play(nextTrack);
        onTrackChange?.(nextTrack);
      }
    } else if (repeatMode === 'none') {
      const isLastTrack = tracks.indexOf(currentTrack!) === tracks.length - 1;
      if (!isLastTrack) {
        const nextTrack = tracks[tracks.indexOf(currentTrack!) + 1];
        play(nextTrack);
        onTrackChange?.(nextTrack);
      } else {
        pause();
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = repeatMode === 'one';
    }
  }, [repeatMode]);

  const handleVolumeToggle = () => {
    if (volume > 0) {
      lastVolumeRef.current = volume;
      setVolume(0);
    } else {
      setVolume(lastVolumeRef.current);
    }
  };

  const handlePrevious = () => {
    if (!tracks || tracks.length <= 1) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    if (currentIndex > 0) {
      const previousTrack = tracks[currentIndex - 1];
      play(previousTrack);
      onTrackChange?.(previousTrack);
    }
  };

  const handleNext = () => {
    if (!tracks || tracks.length <= 1) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    if (currentIndex < tracks.length - 1) {
      const nextTrack = tracks[currentIndex + 1];
      play(nextTrack);
      onTrackChange?.(nextTrack);
    }
  };

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
      px: 2,
      py: 1
    }}>
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={handleTrackEnd}
      />

      <Box sx={{ mb: 1 }}>
        <Slider
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
          sx={{
            color: theme.palette.primary.main,
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}33`
              }
            }
          }}
        />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          px: 0.5,
          color: isDarkMode ? 'grey.400' : 'text.secondary'
        }}>
          <Typography variant="caption">{formatTime(currentTime)}</Typography>
          <Typography variant="caption">{formatTime(duration)}</Typography>
        </Box>
      </Box>

      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center" 
        justifyContent="space-between"
      >
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="subtitle1" sx={{ color: textColor, fontWeight: 'bold' }}>
            {currentTrack?.title}
          </Typography>
          {currentTrack?.artist && (
            <Typography variant="body2" sx={{ color: isDarkMode ? 'grey.400' : 'text.secondary' }}>
              {currentTrack.artist}
            </Typography>
          )}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          justifyContent: 'center',
          flex: 1
        }}>
          {!isMobile && (
            <>
              <Tooltip title={`Repeat Mode: ${repeatMode}`}>
                <IconButton 
                  onClick={toggleRepeat} 
                  sx={{ 
                    color: repeatMode === 'none' ? textColor : 'primary.main'
                  }}
                >
                  {repeatMode === 'one' ? <RepeatOneIcon /> : <RepeatIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Previous">
                <span>
                  <IconButton 
                    onClick={handlePrevious} 
                    disabled={!tracks || tracks.length <= 1 || tracks.indexOf(currentTrack!) === 0}
                    sx={{ color: textColor }}
                  >
                    <SkipPreviousIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </>
          )}

          <Tooltip title="Rewind 10 seconds">
            <IconButton 
              onClick={() => {
                if (audioRef.current) {
                  const newTime = Math.max(0, currentTime - 10);
                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }
              }} 
              sx={{ color: textColor }}
            >
              <Replay10Icon />
            </IconButton>
          </Tooltip>

          <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
            <IconButton 
              onClick={handlePlayPause}
              sx={{ 
                color: textColor,
                transform: 'scale(1.2)'
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Forward 10 seconds">
            <IconButton 
              onClick={() => {
                if (audioRef.current) {
                  const newTime = Math.min(audioRef.current.duration || 0, currentTime + 10);
                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }
              }} 
              sx={{ color: textColor }}
            >
              <Forward10Icon />
            </IconButton>
          </Tooltip>

          {!isMobile && (
            <Tooltip title="Next">
              <span>
                <IconButton 
                  onClick={handleNext} 
                  disabled={!tracks || tracks.length <= 1 || tracks.indexOf(currentTrack!) === tracks.length - 1}
                  sx={{ color: textColor }}
                >
                  <SkipNextIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </Box>

        {!isMobile && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200, justifyContent: 'flex-end' }}>
          <Tooltip title={volume === 0 ? 'Unmute' : 'Mute'}>
            <IconButton onClick={handleVolumeToggle} size="small" sx={{ color: textColor }}>
              {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Tooltip>
          <Slider
            value={volume}
            onChange={(_, newValue) => setVolume(newValue as number)}
            min={0}
            max={1}
            step={0.01}
            sx={{ 
              width: 100,
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
              }
            }}
          />
        </Box>}
      </Stack>
    </Box>
  );
} 