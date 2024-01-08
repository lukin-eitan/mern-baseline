import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV?: string;
  PORT?: number;
  MONGO_DB_NAME?: string;
  MONGO_CONNECTION_STRING?: string;
  SESSION_SECRET?: Array<string>;
  MONGO_SESSION_STORE_SECRET?: string;
  LOGTAIL_TOKEN?: string;
}

const requiredEnvList = [
  'NODE_ENV',
  'PORT',
  'MONGO_DB_NAME',
  'SESSION_SECRET',
  'MONGO_SESSION_STORE_SECRET'
];

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGO_DB_NAME: string;
  MONGO_CONNECTION_STRING?: string;
  MONGO_LOCAL_CONNECTION_STRING?: string; // will only be set by the dbConnection logic in case we are using mongo-memory-server
  SESSION_SECRET: Array<string>;
  MONGO_SESSION_STORE_SECRET: string;
  LOGTAIL_TOKEN?: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV || undefined,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || undefined,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || undefined,
    SESSION_SECRET: process.env.SESSION_SECRET?.split(',') || undefined,
    MONGO_SESSION_STORE_SECRET:
      process.env.MONGO_SESSION_STORE_SECRET || undefined,
    LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN || undefined
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined && key in requiredEnvList) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
