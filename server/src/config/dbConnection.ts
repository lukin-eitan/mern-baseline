import mongoose from 'mongoose';
import { config, logger } from '../index.js';

export const initDB = async () => {
  try {
    if (config.mongoURI) {
      const connect = await mongoose.connect(config.mongoURI, {
        dbName: config.dbName
      });
      logger.info(
        `MongoDB connected: ${
          (connect.connection.host, connect.connection.name)
        }`
      );
    } else {
      logger.error(new Error('MongoDB connection string is missing.'));
      process.exit(1);
    }
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
