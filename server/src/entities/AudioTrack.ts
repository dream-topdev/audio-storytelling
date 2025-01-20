import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('audio_tracks')
export class AudioTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  duration: number;

  @Column()
  artist: string;

  @Column()
  genre: string;

  @Column()
  languageLevel: string;

  @Column()
  description: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  uploadDate: string;

  @Column()
  thumbnail: string;

  @CreateDateColumn()
  createdAt: Date;
} 