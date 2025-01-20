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
      {
        id: 2,
        title: "Making Holiday Plans",
        url: "https://www.oxfordonlineenglish.com/wp-content/uploads/2021/07/Making-holiday-plans-full.mp3",
        duration: 64,
        artist: "Oxford Online English",
        genre: "Travel",
        languageLevel: "Intermediate",
        description: "A conversation about planning vacations and trips",
        tags: ["travel", "vacation", "planning"],
        uploadDate: "2021-07-01",
        thumbnail: "https://images.unsplash.com/photo-1626038135427-bd4eb8193ba5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 3,
        title: "Financial Problems",
        url: "https://www.oxfordonlineenglish.com/wp-content/uploads/2021/05/Talking-about-financial-problems-full.mp3",
        duration: 201,
        artist: "Oxford Online English",
        genre: "Business",
        languageLevel: "Upper Intermediate",
        description: "A discussion about common financial issues and solutions",
        tags: ["money", "business", "finance"],
        uploadDate: "2021-05-01",
        thumbnail: "https://images.unsplash.com/photo-1636041241614-34cca8be1e93?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ];

    await audioTrackRepository.save(sampleTracks);
    console.log('Sample tracks seeded successfully');
  } catch (error) {
    console.error('Error seeding tracks:', error);
  }
}; 