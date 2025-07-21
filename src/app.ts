import express from 'express';
import cors from 'cors';
import { startDatabase } from './config/database';
import UserSchema from './models/user.schema';
import uploadsRoutes from './routes/uploads.routes';
import authRoutes from './routes/auth.routes';
import TweetSchema from './models/tweet.schema';
import LikeTweetSchema from './models/likeTweet.schema';
import DislikeTweetSchema from './models/dislikeTweet.schema';
import CommentSchema from './models/comment.schema';
import LikeCommentSchema from './models/likeComment.schema';
import DislikeCommentSchema from './models/dislikeComment.schema';
import SubscribeSchema from './models/subscribe.schema';
import tweetRoutes from './routes/tweet.routes';
import subscribeRoutes from './routes/subscribe.routes';
import commentRoutes from './routes/comment.routes';
import likeAndDisRoutes from './routes/likeAndDis.routes';

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

startDatabase();

UserSchema.sync();
SubscribeSchema.sync();
TweetSchema.sync();
LikeTweetSchema.sync();
DislikeTweetSchema.sync();
CommentSchema.sync();
LikeCommentSchema.sync();
DislikeCommentSchema.sync();

app.use('/uploads', uploadsRoutes());
app.use('/auth', authRoutes());
app.use('/tweets', tweetRoutes());
app.use('/subscribe', subscribeRoutes());
app.use('/comment',commentRoutes());
app.use('/opinion',likeAndDisRoutes());

app.get('/', (_req, res) => {
  res.json({ message: 'The API is working' });
});

export default app;
