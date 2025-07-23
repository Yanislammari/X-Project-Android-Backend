import SubscribeSchema from "../models/subscribe.schema";
import TweetSchema from "../models/tweet.schema";
import UserSchema from "../models/user.schema";
import TweetRepository from "../repositories/tweet.repository";
import TweetService from './tweet.service';

class SubscribeService{
  private readonly tweetRepository: TweetRepository;
  private readonly tweetService : TweetService;
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.tweetService = new TweetService();
  }


  async subscribe(userId : string,subscribeToId : string): Promise<TweetSchema | null> {
    const alreadySub = await SubscribeSchema.findOne({
      where: {
        userId: userId,
        subscriptionId : subscribeToId
      }
    })
    if (alreadySub) {
      throw new Error("Already subscribed to this user");
    }
    await SubscribeSchema.create({
      userId: userId,
      subscriptionId: subscribeToId
    })
    const tweetToAdd = await this.tweetRepository.getLatestByUserId(subscribeToId);
    if(tweetToAdd != null){
      const tweetFinal = await this.tweetService.addOptionalDataToSingleTweet(tweetToAdd,userId)
      return tweetFinal
    }
    else{
      const newTweet = new TweetSchema();
      newTweet.user = await UserSchema.findOne({ where: { id: subscribeToId } }) || undefined;
      (newTweet as any).dataValues.user = newTweet.user

      if (newTweet.user && (newTweet.user as any).dataValues) {
        (newTweet.user as any).dataValues.isSubscribed = true
      }
      return newTweet
    }
  }

  async unsubscribe(userId : string,subscribeToId : string): Promise<void> {
    await SubscribeSchema.destroy({
      where : {
        userId: userId,
        subscriptionId : subscribeToId
      }
    })
  }

  async getSubscriptions(userId : string): Promise<(TweetSchema | null)[]> {
    const subscriptions = await SubscribeSchema.findAll({
      where: {
        userId: userId
      },
    });
    const latestTweets = await Promise.all(
      subscriptions.map(async (sub) => {
        const tweetToAdd = await this.tweetRepository.getLatestByUserId(sub.subscriptionId);
        if(tweetToAdd != null){
          const tweetFinal = await this.tweetService.addOptionalDataToSingleTweet(tweetToAdd,userId)
          return tweetFinal
        }
        else{
          const newTweet = new TweetSchema();
          newTweet.user = await UserSchema.findOne({ where: { id: sub.subscriptionId } }) || undefined;
          (newTweet as any).dataValues.user = newTweet.user

          if (newTweet.user && (newTweet.user as any).dataValues) {
            (newTweet.user as any).dataValues.isSubscribed = !!await SubscribeSchema.findOne({
              where: { userId, subscriptionId: newTweet.user.id }
            });
          }
          return newTweet
        }
      })
    );
    return latestTweets;
  }
}

export default SubscribeService;