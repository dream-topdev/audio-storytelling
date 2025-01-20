import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { AudioTrack } from '../entities/AudioTrack';

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

    const sampleTracks = [
      {
        title: "Playing Cards",
        url: "https://www.oxfordonlineenglish.com/wp-content/uploads/2021/05/Playing-cards-full.mp3",
        duration: 35,
        artist: "Oxford Online English",
        genre: "Conversation",
        languageLevel: "Intermediate",
        description: "A dialogue about card games and playing cards",
        tags: ["games", "entertainment", "conversation"],
        uploadDate: "2021-05-01",
        thumbnail: "https://images.unsplash.com/photo-1632324343640-86af9827dbeb"
      },
      // Add more sample tracks as needed
    ];

    await audioTrackRepository.save(sampleTracks);
    console.log('Sample tracks seeded successfully');
  } catch (error) {
    console.error('Error seeding tracks:', error);
  }
}; 