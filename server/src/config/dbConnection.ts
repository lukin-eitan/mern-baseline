import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from './envConfig.js';
import { logger } from './logging.js';

export const connectDB = async () => {
  if (config.NODE_ENV === 'test') {
    await connectDBTest();
  } else {
    await connectDBCloud();
  }
};

const connectDBTest = async () => {
  await connectLocalDB();
};

const connectDBCloud = async () => {
  try {
    if (config.MONGO_CONNECTION_STRING) {
      const connect = await mongoose.connect(config.MONGO_CONNECTION_STRING, {
        dbName: config.MONGO_DB_NAME
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

export const connectLocalDB = async (): Promise<MongoMemoryServer> => {
  const mongoLocalServer = await MongoMemoryServer.create();
  const uri = mongoLocalServer.getUri();
  config.MONGO_LOCAL_CONNECTION_STRING = uri; // update config
  try {
    const connect = await mongoose.connect(uri, {
      dbName: config.MONGO_DB_NAME
    });
    logger.info(
      `MongoDB connected: ${(connect.connection.host, connect.connection.name)}`
    );
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  return mongoLocalServer;
};

export const disconnectLocalDB = async (
  mongoLocalServer: MongoMemoryServer
) => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoLocalServer.stop();
};
