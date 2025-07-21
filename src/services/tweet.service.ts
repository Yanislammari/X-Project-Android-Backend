import AuthService from "./auth.service";
import TweetRepository from "../repositories/tweet.repository";
import TweetSchema from "../models/tweet.schema";
import UserSchema from "../models/user.schema";

class TweetService {
  private readonly tweetRepository: TweetRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async getAllTweets(): Promise<TweetSchema[]> {
    return this.tweetRepository.getAll();
  }

  async createTweet(tweetData: any,user : UserSchema): Promise<TweetSchema> {
    const tweet = await this.tweetRepository.add({
      userId: user.id,
      content: tweetData.content,
      timestamp: tweetData.timestamp,
      tweetPicture: tweetData.tweetPicture,
    } as any);
    tweet.user = user;
    return tweet;
  }
}

export default TweetService;