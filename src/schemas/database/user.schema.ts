import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database";

export class UserSchema extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public profilePicture!: string | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

UserSchema.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  }}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default UserSchema;
