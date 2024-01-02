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
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  MONGO_CONNECTION_STRING: string | undefined;
  SESSION_SECRET: Array<string> | undefined;
  MONGO_SESSION_STORE_SECRET: string | undefined;
  LOGTAIL_TOKEN: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGO_CONNECTION_STRING: string;
  SESSION_SECRET: Array<string>;
  MONGO_SESSION_STORE_SECRET: string;
  LOGTAIL_TOKEN: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    SESSION_SECRET: process.env.SESSION_SECRET?.split(','),
    MONGO_SESSION_STORE_SECRET: process.env.MONGO_SESSION_STORE_SECRET,
    LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
