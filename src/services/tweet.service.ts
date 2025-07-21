import AuthService from "./auth.service";
import TweetRepository from "../repositories/tweet.repository";
import TweetSchema from '../models/tweet.schema';
import UserSchema from "../models/user.schema";
import SubscribeSchema from "../models/subscribe.schema";
import CommentSchema from "../models/comment.schema";
import LikeTweetSchema from "../models/likeTweet.schema";
import DislikeTweetSchema from "../models/dislikeTweet.schema";

class TweetService {
  private readonly tweetRepository: TweetRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async getAllTweets(userId : string): Promise<TweetSchema[]> {
    const tweets = await this.tweetRepository.getAll();
    return await this.addOptionalDataToTweet(tweets,userId);
  }

  async getAllTweetsById(userId: string,currentId : string): Promise<TweetSchema[]> {
    const tweets =  await TweetSchema.findAll({
      where: { userId },
      include: [
        {
          model: UserSchema,
          as: 'User',
        }
      ],
      order: [['created_at', 'DESC']],
    })
    return await this.addOptionalDataToTweet(tweets,currentId);
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

  async addOptionalDataToTweet(tweetsSchema : TweetSchema[],userId: string) : Promise<TweetSchema[]> {
    return Promise.all(tweetsSchema.map(async (tweet) => {
        const sub = await SubscribeSchema.findOne({
          where : { userId, subscriptionId: tweet.userId },
        });
        (tweet as any).dataValues.isSubscribed = !!sub;
        (tweet as any).dataValues.isCommented = !!await CommentSchema.findOne({where : {userId, tweetId: tweet.id}});
        (tweet as any).dataValues.isLiked = !!await LikeTweetSchema.findOne({where : {userId, tweetId: tweet.id}});
        (tweet as any).dataValues.isDisliked = !!await DislikeTweetSchema.findOne({where: {userId, tweetId: tweet.id}});
        (tweet as any).dataValues.likeCount = await LikeTweetSchema.count({ where: { userId,tweetId: tweet.id } });
        (tweet as any).dataValues.dislikeCount = await DislikeTweetSchema.count({ where: { userId,tweetId: tweet.id}});
        return tweet;
      })
    )
  }
}

export default TweetService;