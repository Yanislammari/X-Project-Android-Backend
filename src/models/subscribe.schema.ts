import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import UserSchema from "./user.schema";

class SubscribeSchema extends Model {
  public id!: string;
  public subscriptionId!: string;
  public userId!: string;
}

SubscribeSchema.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subscriptionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
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
  modelName: "Subscribe",
  tableName: "subscribe",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default SubscribeSchema;

UserSchema.hasMany(SubscribeSchema)
SubscribeSchema.belongsTo(UserSchema)
