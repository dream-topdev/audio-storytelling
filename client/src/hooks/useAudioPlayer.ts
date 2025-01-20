import { useState, useEffect } from 'react';
import { AudioTrack } from '../../../shared/types/audio';

export const useAudioPlayer = (tracks: AudioTrack[], selectedTrack: AudioTrack | null) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(selectedTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (selectedTrack) {
      setCurrentTrack(selectedTrack);
    }
  }, [selectedTrack]);

  const play = (track?: AudioTrack) => {
    if (track) {
      setCurrentTrack(track);
    }
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const next = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextTrack = tracks[currentIndex + 1];
    if (nextTrack) {
      setCurrentTrack(nextTrack);
    }
  };

  const previous = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const previousTrack = tracks[currentIndex - 1];
    if (previousTrack) {
      setCurrentTrack(previousTrack);
    }
  };

  return {
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    duration,
    play,
    pause,
    next,
    previous,
    setCurrentTime,
    setVolume,
    setDuration
  };
}; 