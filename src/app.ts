import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'The API is working' });
});

export default app;
