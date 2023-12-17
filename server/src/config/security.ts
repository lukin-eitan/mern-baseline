import express from 'express';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';

export default function initSecurity(app: express.Application) {
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204,
  };
  app.use(cors(corsOptions));

  app.use(helmet());
  console.log('security features loaded');
}
