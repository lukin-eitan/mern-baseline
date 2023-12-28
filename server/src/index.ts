import express, { Express, Request, Response } from 'express';
import connectDB from './config/dbConnection.js';
import errorHandler from './middleware/errorHandler.js';
import config from './config/envConfig.js';
import initPassportAndSession from './config/passportSession.js';
import initSecurity from './config/security.js';
import { router as usersRoutes } from './routes/userRoutes.js';
import { router as authRoutes } from './routes/authRoutes.js';

await connectDB();
const app: Express = express();
const port = config.PORT || 8080;

initSecurity(app);
initPassportAndSession(app);
app.use(express.json());

app.get('/', (req: Request, res: Response) => res.send('Hello World'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
