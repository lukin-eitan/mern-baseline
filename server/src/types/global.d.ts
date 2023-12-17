namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_CONNECTION_STRING: string;
    SESSION_SECRET: string;
    MONGO_SESSION_STORE_SECRET: string;
  }
}
