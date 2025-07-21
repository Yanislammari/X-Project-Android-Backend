import { Request,Response,NextFunction } from "express";
import CommentService from "../services/comment.service";
import CommentSchema from "../models/comment.schema";

class CommentController{
  private readonly commentService : CommentService;

  constructor(){
    this.commentService = new CommentService();
  }

  async getAllComments(req: Request, res: Response, next: NextFunction) {
    const tweetId = req.params.tweet_id;
    try {
      const comments = await this.commentService.getCommentsByTweetId(tweetId,(req as any).user.id);
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async postComment(req: Request, res: Response, next: NextFunction) {
    const tweetId = req.params.tweet_id;
    const { content,timestamp } = req.body;
    const userId = (req as any).user.id;

    if (!content || !userId || !timestamp || !tweetId) {
      res.status(400).json({ message: "Content and user ID are required" });
      return;
    }

    try {
      const newComment = await this.commentService.createComment({
        content,
        timestamp,
        tweetId,
        userId
      },(req as any).user);
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
}

export default CommentController;