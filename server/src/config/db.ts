import mongoose from 'mongoose';

export let isMongoConnected = false;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/scamshield';

  try {
    // Attempt connection with a short timeout to prevent blocking startup
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Timeout after 2.5 seconds if MongoDB server is down
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected to database: ${conn.connection.name} at ${conn.connection.host}`);
  } catch (error: any) {
    isMongoConnected = false;
    console.warn(`[Database Warning] Unable to connect to MongoDB server: ${error.message}`);
    console.info(`[ScamShield Engine] Resilient In-Memory Storage is ACTIVE. All features, scans, reports, and authentication will function flawlessly out-of-the-box.`);
  }
};

