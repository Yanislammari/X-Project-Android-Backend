import { Request, Response, NextFunction } from "express";
import TweetService from "../services/tweet.service";
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = process.env.BASE_URL as string;


class TweetController {
  private readonly tweetService: TweetService;

  constructor() {
    this.tweetService = new TweetService();
  }

  async getAllTweets(req: Request, res: Response, next: NextFunction) {
    try {
      const tweets = await this.tweetService.getAllTweets((req as any).user.id);
      res.status(200).json(tweets);
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

  async getAllTweetsById(req: Request, res: Response, next: NextFunction) {
    try {
      const tweetId = req.params.id;
      if (!tweetId) {
        res.status(400).json({ message: "Tweet ID is required." });
        return;
      }
      const tweet = await this.tweetService.getAllTweetsById(tweetId,(req as any).user.id);
      res.status(200).json(tweet);
    } catch (err) {
      console.error("Error fetching tweet by ID:", err);
      next(err);
    }
  }

  async createTweet(req: Request, res: Response, next: NextFunction) {
    try {
      let tweetPictureUrl: string | undefined = undefined;
      if(req.file) {
        const encodedFilename = encodeURIComponent(req.file.filename);
        tweetPictureUrl = `${BASE_URL}/uploads/tweet-images/${encodedFilename}`;
      }
      const {content,timestamp} = req.body;
      if (!content || !timestamp) {
        res.status(400).json({ message: "Content and timestamp are required." });
      }
      else{
        const tweet = await this.tweetService.createTweet({
          content,
          timestamp,
          tweetPicture: tweetPictureUrl,
        }, (req as any).user);
        res.status(201).json(tweet);
      }
    } catch (err) {
      console.error("Error creating tweet:", err);
      next(err);
    }
  }
}

export default TweetController;