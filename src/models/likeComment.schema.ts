import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class LikeCommentSchema extends Model {
  public id!: string;
  public commentId!: string;
  public userId!: string;
}

LikeCommentSchema.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  commentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'comments',
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
  modelName: "LikeComment",
  tableName: "like_comments",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default LikeCommentSchema;
