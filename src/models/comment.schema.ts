import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import UserSchema from "./user.schema";

class CommentSchema extends Model {
  public id!: string;
  public content!: string;
  public timestamp!: number;
  public tweetId!: string;
  public userId!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public user?: InstanceType<typeof UserSchema>;
}

CommentSchema.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp:{
    type : DataTypes.INTEGER,
    allowNull: false,
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
  modelName: "Comment",
  tableName: "comments",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  }
);

export default CommentSchema;


UserSchema.hasMany(CommentSchema , { 
  foreignKey: 'userId',
  as : "comments" 
});
CommentSchema.belongsTo(UserSchema, { 
  foreignKey: 'userId',
  as : "user" 
});