import mongoose from 'mongoose';
import config from './envConfig.js';
import { logger } from './logging.js';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(config.MONGO_CONNECTION_STRING);
    logger.info(
      `MongoDB connected: ${(connect.connection.host, connect.connection.name)}`
    );
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

export default connectDB;
