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
          as: 'User',
        }
      ],
      order: [['created_at', 'DESC']],
    })
    return tweets;
  }
}

export default TweetRepository; 