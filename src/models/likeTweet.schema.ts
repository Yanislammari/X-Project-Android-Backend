import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class LikeTweetSchema extends Model {
  public id!: string;
  public tweetId!: string;
  public userId!: string;
}

LikeTweetSchema.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tweetId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tweets',
      key: 'id',
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: "LikeTweet",
  tableName: "like_tweets",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default LikeTweetSchema;


