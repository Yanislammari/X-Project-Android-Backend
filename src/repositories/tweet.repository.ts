import TweetSchema from "../models/tweet.schema";
import UserSchema from "../models/user.schema";
import BaseRepository from "./base.repository";

class TweetRepository extends BaseRepository<TweetSchema> {
  constructor() {
    super(TweetSchema);
  }

  async getAll(): Promise<TweetSchema[]> {
    const tweets = await this.model.findAll({
      include: [
        {
          model: UserSchema,
          as: 'user',
        }
      ],
      order: [['created_at', 'DESC']],
    })
    return tweets;
  }

  async getLatestByUserId(userId: string): Promise<TweetSchema | null> {
    const tweet = await this.model.findOne({
      where: { userId },          // filter by userId
      order: [['created_at', 'DESC']],  // latest tweet first (assuming you have a `timestamp` field)
      include: [
        {
          model: UserSchema,
          as: 'user',
        },
      ],
    });
    return tweet;
  }
}

export default TweetRepository; 