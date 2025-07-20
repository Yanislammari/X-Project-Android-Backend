import BaseRepository from "./base.repository";
import UserSchema from "../models/user.schema";
import { Model } from "sequelize";

class UserRepository extends BaseRepository<UserSchema> {
  constructor() {
    super(UserSchema);
  }

  async getByEmail(email: string): Promise<UserSchema | null> {
    const user = await this.model.findOne({ where: { email } });
    return user ? (user.toJSON() as UserSchema) : null;
  }
}

export default UserRepository; 
