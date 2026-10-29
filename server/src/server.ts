import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { DataStore } from './services/dataStore.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB with fast timeout & in-memory fallback
    await connectDB();

    // Seed education database articles if empty
    await DataStore.education.seedIfEmpty();

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🛡️  ScamShield AI — Digital Fraud & Scam Detection API`);
      console.log(`⚡ Server running on: http://localhost:${PORT}`);
      console.log(`📡 Health endpoint:  http://localhost:${PORT}/api/health`);
      console.log(`🔒 Defensive AI Risk Analysis Engine is READY.`);
      console.log(`=======================================================`);
    });
  } catch (error: any) {
    console.error('Fatal server boot error:', error.message);
    process.exit(1);
  }
}

startServer();

