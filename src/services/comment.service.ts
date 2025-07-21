import CommentSchema from "../models/comment.schema";
import DislikeCommentSchema from "../models/dislikeComment.schema";
import DislikeTweetSchema from "../models/dislikeTweet.schema";
import LikeCommentSchema from "../models/likeComment.schema";
import LikeTweetSchema from "../models/likeTweet.schema";
import UserSchema from "../models/user.schema";

class CommentService{
  constructor(){

  }

  async getCommentsByTweetId(tweetId: string,userId:string) {
    const comments = await CommentSchema.findAll({
      where : {tweetId},
      include:[
        {
          model: UserSchema,
          as: 'User',
        }
      ]
    })
    return await this.addOptionalDataToComment(comments,userId);
  }

  async createComment(commentData: { content: string;timestamp : bigint; tweetId: string; userId: string },user : UserSchema) {
    const { content, timestamp, tweetId, userId } = commentData;

    const comment = await CommentSchema.findOne({where : {userId,tweetId}});
    if (comment) {
      throw new Error("You have already commented on this tweet");
    }

    const newComment = await CommentSchema.create({
      content,
      timestamp,
      tweetId,
      userId
    });
    (newComment as any).dataValues.user = user;

    return newComment;
  }

  async addOptionalDataToComment(commentsSchema : CommentSchema[],userId: string) : Promise<CommentSchema[]> {
    return Promise.all(commentsSchema.map(async (comment) => {
        (comment as any).dataValues.isLiked = !!await LikeCommentSchema.findOne({where : {userId, commentId: comment.id}});
        (comment as any).dataValues.isDisliked = !!await DislikeCommentSchema.findOne({where: {userId, commentId: comment.id}});
        (comment as any).dataValues.likeCount = await LikeCommentSchema.count({ where: { userId,commentId: comment.id } });
        (comment as any).dataValues.dislikeCount = await DislikeCommentSchema.count({ where: { userId,commentId: comment.id}});
        return comment;
      })
    )
  }
}

export default CommentService;