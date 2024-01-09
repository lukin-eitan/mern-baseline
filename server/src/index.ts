import express, { Express, Request, Response } from 'express';
import { initDB } from './config/dbConnection.js';
import errorHandler from './middleware/errorHandler.js';
import { Config } from './config/envConfig.js';
import initPassportAndSession from './config/passportSession.js';
import initSecurity from './config/security.js';
import { router as usersRoutes } from './routes/userRoutes.js';
import { router as authRoutes } from './routes/authRoutes.js';
import { initLogs } from './config/logging.js';

const app: Express = express();

export const config = await Config.create();
export const logger = initLogs(app);
logger.info('Bringing up server');
await initDB();
initSecurity(app);
initPassportAndSession(app);

app.use(express.json());

app.get('/', (req: Request, res: Response) => res.send('Hello World'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);

app.use(errorHandler);

app.listen(config.port, () =>
  logger.info(`Server started on port ${config.port}`)
);
