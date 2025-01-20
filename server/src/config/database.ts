import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { AudioTrack } from "../entities/AudioTrack";
import path from "path";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.join(__dirname, "../../database.sqlite"),
    entities: [User, AudioTrack],
    synchronize: true,
    logging: process.env.NODE_ENV === "development"
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database initialized");
    } catch (error) {
        console.error("Error initializing database:", error);
        process.exit(1);
    }
}; 