import { Model, ModelStatic } from "sequelize";
import IRepository from "./repository";

abstract class BaseRepository<T extends Model> implements IRepository<T> {
  protected readonly model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    const items = await this.model.findAll();
    return items.map(item => item.toJSON() as T);
  }

  async get(id: string): Promise<T> {
    const item = await this.model.findByPk(id);
    if (!item) {
      throw new Error("Not found");
    }
    return item.toJSON() as T;
  }

  async add(data: any): Promise<T> {
    const created = await this.model.create(data);
    return created.toJSON() as T;
  }

  async put(id: string, data: Partial<T>): Promise<T> {
    const item = await this.model.findByPk(id);
    if (!item) {
      throw new Error("Not found");
    }
    await item.update(data);
    return item.toJSON() as T;
  }

  async delete(id: string): Promise<void> {
    const item = await this.model.findByPk(id);
    if (!item) {
      throw new Error("Not found");
    }
    await item.destroy();
  }
}

export default BaseRepository;
