import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import UserSchema from "./user.schema";

class TweetSchema extends Model {
  public id!: string;
  public content!: string;
  public tweetPicture?: string;
  public timestamp!: number;
  public userId!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public user?: InstanceType<typeof UserSchema>;
  public isSubscribed?: boolean;
  public isCommented?: boolean;
  public isLiked?: boolean;
  public isDisliked?: boolean;
  public likeCount?: number;
  public dislikeCount?: number;
}

TweetSchema.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tweetPicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timestamp:{
    type : DataTypes.BIGINT,
    allowNull: false,
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
  modelName: "Tweet",
  tableName: "tweets",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  }
);

export default TweetSchema;

UserSchema.hasMany(TweetSchema, { 
  foreignKey: 'userId',
  as : "tweets"
});
TweetSchema.belongsTo(UserSchema, { 
  foreignKey: 'userId',
  as : "user"
});
