import {Response , Request, NextFunction} from "express"
import LikeAndDisService from "../services/likeAndDis.service";

class LikeAndDisController{
  private readonly likeAndDisService: LikeAndDisService;

  constructor() {
    this.likeAndDisService = new LikeAndDisService();
  }

  async likeComment(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const commentId = req.params.comment_id;

    if(!userId || !commentId) {
      res.status(400).json({ message: "User ID and Comment ID are required" });
      return;
    }

    try {
      await this.likeAndDisService.likeComment(userId, commentId);
      res.status(200).json({ message: "Comment liked successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error liking comment", error });
    }
  }

  async dislikeComment(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const commentId = req.params.comment_id;

    if(!userId || !commentId) {
      res.status(400).json({ message: "User ID and Comment ID are required" });
      return;
    }
    try {
      await this.likeAndDisService.dislikeComment(userId, commentId);
      res.status(200).json({ message: "Comment disliked successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error disliking comment", error });
    }
  }

  async likeTweet(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const tweetId = req.params.tweet_id;

    if(!userId || !tweetId) {
      res.status(400).json({ message: "User ID and Tweet ID are required" });
      return;
    }

    try {
      await this.likeAndDisService.likeTweet(userId, tweetId);
      res.status(200).json({ message: "Tweet liked successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error liking tweet", error });
    }
  }

  async dislikeTweet(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const tweetId = req.params.tweet_id;

    if(!userId || !tweetId) {
      res.status(400).json({ message: "User ID and Tweet ID are required" });
      return;
    }

    try {
      await this.likeAndDisService.dislikeTweet(userId, tweetId);
      res.status(200).json({ message: "Tweet disliked successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error disliking tweet", error });
    }
  }
}

export default LikeAndDisController;