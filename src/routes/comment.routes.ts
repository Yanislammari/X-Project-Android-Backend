import express from "express";
import { createVerifyTokenMiddleware } from "../middleware/token";
import CommentController from "../controllers/comment.controller";

const commentRoutes = () => {
  const router = express.Router();
  const commentController = new CommentController();

  router.get("/comments/:tweet_id", createVerifyTokenMiddleware(), commentController.getAllComments.bind(commentController));
  router.post("/comments/:tweet_id", createVerifyTokenMiddleware(),commentController.postComment.bind(commentController));

  return router;
}

export default commentRoutes;