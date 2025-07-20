import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class UserSchema extends Model {
  public id!: number;
  public pseudo!: string;
  public email!: string;
  public password!: string;
  public bio!: string;
  public profilePicture?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

UserSchema.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  pseudo: {
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
  bio : {
    type : DataTypes.STRING,
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
