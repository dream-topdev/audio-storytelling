import { Request, Response } from 'express';
import { AudioTrack } from '../../../shared/types/audio';

// Sample audio data (replace with database in production)
const audioTracks: AudioTrack[] = [
  {
    id: 1,
    title: "Playing Cards",
    url: "https://www.oxfordonlineenglish.com/wp-content/uploads/2021/05/Playing-cards-full.mp3",
    duration: 35,
    artist: "Oxford Online English",
    genre: "Conversation",
    languageLevel: "Intermediate",
    description: "A dialogue about card games and playing cards",
    tags: ["games", "entertainment", "conversation"],
    uploadDate: "2021-05-01",
    thumbnail: "https://images.unsplash.com/photo-1632324343640-86af9827dbeb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

export const getTracks = (req: Request, res: Response) => {
  res.json(audioTracks);
}; 