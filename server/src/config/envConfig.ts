import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { MongoMemoryServer } from 'mongodb-memory-server';

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

interface ValidatedENV {
  NODE_ENV: string;
  PORT: number;
  MONGO_DB_NAME: string;
  MONGO_CONNECTION_STRING?: string;
  SESSION_SECRET: Array<string>;
  MONGO_SESSION_STORE_SECRET: string;
  LOGTAIL_TOKEN?: string;
}

export class Config {
  private NODE_ENV: string;
  private PORT: number;
  private MONGO_DB_NAME: string;
  private MONGO_CONNECTION_STRING?: string;
  private SESSION_SECRET: Array<string>;
  private MONGO_SESSION_STORE_SECRET: string;
  private LOGTAIL_TOKEN?: string;
  private mongoLocalServer?: MongoMemoryServer;

  constructor() {
    const validatedParams = this.validateEnvVariables();
    this.NODE_ENV = validatedParams.NODE_ENV || 'test';
    this.PORT = validatedParams.PORT || 3000;
    this.MONGO_DB_NAME = validatedParams.MONGO_DB_NAME || 'test';
    this.MONGO_CONNECTION_STRING = validatedParams.MONGO_CONNECTION_STRING;
    this.SESSION_SECRET = validatedParams.SESSION_SECRET;
    this.MONGO_SESSION_STORE_SECRET =
      validatedParams.MONGO_SESSION_STORE_SECRET;
    this.LOGTAIL_TOKEN = validatedParams.LOGTAIL_TOKEN;

    // Object.freeze(this); // Freezing the object so that no one can change it. This is a best practice.
    Object.setPrototypeOf(this, Config.prototype); // Setting the prototype of the object to the config class. This is a best practice.
  }

  // Throwing an Error if any field was undefined we don't
  // want our app to run if it can't connect to DB and ensure
  // that these fields are accessible. If all is good return
  // it as Config which just removes the undefined from our type
  // definition.
  private validateEnvVariables() {
    const params = {
      NODE_ENV: process.env.NODE_ENV || undefined,
      PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
      MONGO_DB_NAME: process.env.MONGO_DB_NAME || undefined,
      MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || undefined,
      SESSION_SECRET: process.env.SESSION_SECRET?.split(',') || undefined,
      MONGO_SESSION_STORE_SECRET:
        process.env.MONGO_SESSION_STORE_SECRET || undefined,
      LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN || undefined
    } as ENV;
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined && key in requiredEnvList) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }
    return params as ValidatedENV; // Returning the object. This is a best practice.
  }

  static async create() {
    const configObj = new Config();
    await configObj.connectLocalMemoryServerIfCloudNotProvided();
    Object.freeze(this);
    return configObj;
  }

  async connectLocalMemoryServerIfCloudNotProvided() {
    if (this.MONGO_CONNECTION_STRING === undefined) {
      this.mongoLocalServer = await MongoMemoryServer.create();
      this.MONGO_CONNECTION_STRING = this.mongoLocalServer.getUri();
    }
  }

  async disconnectLocalMemoryServer() {
    return this.mongoLocalServer?.stop();
  }

  get nodeEnv() {
    return this.NODE_ENV;
  }
  get port() {
    return this.PORT;
  }
  get dbName() {
    return this.MONGO_DB_NAME;
  }
  get mongoURI() {
    return this.MONGO_CONNECTION_STRING || '';
  }
  get sessionSecret() {
    return this.SESSION_SECRET;
  }
  get sessionStoreSecret() {
    return this.MONGO_SESSION_STORE_SECRET;
  }
  get logManagerToken() {
    return this.LOGTAIL_TOKEN;
  }
  get getLocalMemoryServer() {
    return this.mongoLocalServer;
  }
}
