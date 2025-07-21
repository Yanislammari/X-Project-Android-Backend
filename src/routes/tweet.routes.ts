import express from "express";
import { uploadTweetConfig } from "../config/upload";
import TweetController from "../controllers/tweet.controller";
import { createVerifyTokenMiddleware } from "../middleware/token";

const tweetRoutes = () => {
  const router = express.Router();
  const tweetController = new TweetController();

  router.post("/tweets", createVerifyTokenMiddleware(), uploadTweetConfig, tweetController.createTweet.bind(tweetController));
  router.get("/tweets", createVerifyTokenMiddleware(),tweetController.getAllTweets.bind(tweetController));

  return router;
}

export default tweetRoutes;