import express from 'express';
import cors from 'cors';
import { startDatabase } from './config/database';
import UserSchema from './schemas/database/user.schema';

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

startDatabase();

UserSchema.sync();

app.get('/', (_req, res) => {
  res.json({ message: 'The API is working' });
});

export default app;
