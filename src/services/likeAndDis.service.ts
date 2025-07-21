import { where } from "sequelize";
import DislikeCommentSchema from "../models/dislikeComment.schema";
import LikeCommentSchema from "../models/likeComment.schema";
import DislikeTweetSchema from "../models/dislikeTweet.schema";
import LikeTweetSchema from "../models/likeTweet.schema";

class LikeAndDisService {
  constructor() {}

  async likeComment(userId: string, commentId: string) {
    await DislikeCommentSchema.destroy({where : {userId,commentId}})
    await LikeCommentSchema.findOrCreate({
      where : {userId,commentId},
      defaults: { userId, commentId }
    });
  }

  async dislikeComment(userId: string, commentId: string) {
    await LikeCommentSchema.destroy({where : {userId,commentId}})
    await DislikeCommentSchema.findOrCreate({
      where : {userId,commentId},
      defaults: { userId, commentId }
    });
  }

  async likeTweet(userId: string, tweetId: string) {
    await DislikeTweetSchema.destroy({where : {userId,tweetId}})
    await LikeTweetSchema.findOrCreate({
      where : {userId,tweetId},
      defaults: { userId, tweetId }
    });
  }

  async dislikeTweet(userId: string, tweetId: string) {
    await LikeTweetSchema.destroy({where : {userId,tweetId}})
    await DislikeTweetSchema.findOrCreate({
      where : {userId,tweetId},
      defaults: { userId, tweetId }
    });
  }
}

export default LikeAndDisService;