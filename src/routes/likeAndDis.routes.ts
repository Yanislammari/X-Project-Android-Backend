import express from "express";
import { createVerifyTokenMiddleware } from "../middleware/token";
import LikeAndDisController from "../controllers/likeAndDis.controller";


const likeAndDisRoutes = () => {
  const router = express.Router();
  const likeAndDisController = new LikeAndDisController();

  router.post("/like_comments/:comment_id", createVerifyTokenMiddleware(), likeAndDisController.likeComment.bind(likeAndDisController));
  router.post("/dislike_comments/:comment_id", createVerifyTokenMiddleware(),likeAndDisController.dislikeComment.bind(likeAndDisController));
  router.post("/like_tweets/:tweet_id", createVerifyTokenMiddleware(), likeAndDisController.likeTweet.bind(likeAndDisController));
  router.post("/dislike_tweets/:tweet_id", createVerifyTokenMiddleware(), likeAndDisController.dislikeTweet.bind(likeAndDisController));

  return router;
}

export default likeAndDisRoutes;