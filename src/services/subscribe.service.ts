import SubscribeSchema from "../models/subscribe.schema";
import TweetSchema from "../models/tweet.schema";
import TweetRepository from "../repositories/tweet.repository";

class SubscribeService{
  private readonly tweetRepository: TweetRepository;
  constructor() {
    this.tweetRepository = new TweetRepository();
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
    return tweetToAdd;
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
        return await this.tweetRepository.getLatestByUserId(sub.subscriptionId);
      })
    );
    return latestTweets;
  }
}

export default SubscribeService;