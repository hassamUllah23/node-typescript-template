import { FilterQuery } from "mongoose";
import { DeleteResult, UpdateResult } from "mongodb";
import { UserDocument } from "../../database";
import { LogService } from "../../services";
import { UsersRepository } from ".";

export class UsersService {
  private readonly repository: UsersRepository;
  constructor() {
    this.repository = new UsersRepository();
  }

  async getList(
    filter: FilterQuery<UserDocument>
  ): Promise<Array<UserDocument>> {
    try {
      const result = await this.repository?.getList(
        {
        filter:{ ...filter },
        project:{ password: 0, conversations: 0 }}
      );
      return result ? [...result] : [];
    } catch (error) {
      LogService.log("error", error as string);
      return [];
    }
  }

  async getOne(
    filter: FilterQuery<UserDocument>
  ): Promise<UserDocument | undefined | null> {
    try {
      const result = await this.repository?.getOne({
        filter: filter,
        populate: true,
      });
      return result;
    } catch (error) {
      LogService.log("error", error as string);
      return undefined;
    }
  }

  async update(
    id: string,
    data: Partial<UserDocument>
  ): Promise<UpdateResult | undefined | null> {
    try {
      return await this.repository?.update({filter:{ _id: id }, data:{ ...data }});
    } catch (error) {
      LogService.log("error", error as string);
      return undefined;
    }
  }

  async create(data: UserDocument): Promise<UserDocument | undefined | null> {
    try {
      return await this.repository?.create({ ...data });
    } catch (error) {
      LogService.log("error", error as string);
      return undefined;
    }
  }

  async count(filter: FilterQuery<UserDocument>): Promise<number | undefined> {
    try {
      return await this.repository?.count({ ...filter });
    } catch (error) {
      LogService.log("error", error as string);
    }
  }

  async delete(
    filter: FilterQuery<UserDocument>
  ): Promise<DeleteResult | undefined> {
    try {
      return await this.repository?.delete({ ...filter });
    } catch (error) {
      LogService.log("error", error as string);
      return undefined;
    }
  }
}
