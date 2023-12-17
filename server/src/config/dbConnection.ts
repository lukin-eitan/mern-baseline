import mongoose from 'mongoose';
import config from './envConfig.js';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(config.MONGO_CONNECTION_STRING);
    console.log(
      `MongoDB connected: ${(connect.connection.host, connect.connection.name)}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
