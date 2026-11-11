import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedDatabase } from './seed.js';

let mongoMemoryServer: MongoMemoryServer | null = null;

export const connectDB = async (): Promise<string> => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection.host;
    }

    let uri = process.env.MONGODB_URI;

    if (!uri) {
      console.log('No MONGODB_URI environment variable detected.');
      console.log('Booting embedded MongoDB Memory Server for instant full-stack live preview...');
      mongoMemoryServer = await MongoMemoryServer.create();
      uri = mongoMemoryServer.getUri();
      console.log(`MongoDB Memory Server started at: ${uri}`);
    } else {
      console.log('Connecting to provided MONGODB_URI...');
    }

    await mongoose.connect(uri, {
      dbName: 'kuntamukkala_connect',
    });

    console.log('MongoDB successfully connected!');

    // Seed database if empty
    await seedDatabase();

    return mongoose.connection.host;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
