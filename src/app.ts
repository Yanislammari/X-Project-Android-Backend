import express from 'express';
import cors from 'cors';
import { startDatabase } from './config/database';
import UserSchema from './models/user.schema';
import uploadsRoutes from './routes/uploads.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

startDatabase();

UserSchema.sync();

app.use('/uploads', uploadsRoutes());
app.use('/auth', authRoutes());

app.get('/', (_req, res) => {
  res.json({ message: 'The API is working' });
});

export default app;
