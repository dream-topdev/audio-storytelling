import { Request, Response } from 'express';

import { AppDataSource } from '../config/database';
import { AudioTrack } from '../entities/AudioTrack';
import { sampleTracks } from '../utils/seedData';

const audioTrackRepository = AppDataSource.getRepository(AudioTrack);

export const getTracks = async (_: Request, res: Response) => {
  try {
    const tracks = await audioTrackRepository.find();
    res.json(tracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ message: 'Error fetching tracks' });
  }
};

export const seedTracks = async () => {
  try {
    const count = await audioTrackRepository.count();
    if (count > 0) return; // Don't seed if tracks exist

    await audioTrackRepository.save(sampleTracks);
    console.log('Sample tracks seeded successfully');
  } catch (error) {
    console.error('Error seeding tracks:', error);
  }
}; 