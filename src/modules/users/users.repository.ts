import { DeleteResult, UpdateResult } from "mongodb";
import { FilterQuery, Model, ProjectionType } from "mongoose";
import { User, UserDocument } from "../../database";
import { RepositoryInterface } from "../../utils";

export class UsersRepository
  implements RepositoryInterface<Model<UserDocument>, UserDocument>
{
  readonly model: Model<UserDocument> | undefined = undefined;
  private readonly populants: Array<string> = [];

  constructor() {
    this.model = User;
    this.populants = ["field1", "field2"];
  }

  async create(data: UserDocument): Promise<UserDocument | null | undefined> {
    return await this.model?.create({ ...data });
  }

  async getList({
    populate = false,
    filter,
    project,
  }: {
    populate?: boolean;
    filter?: FilterQuery<UserDocument>;
    project?: ProjectionType<UserDocument>;
  }): Promise<Array<UserDocument> | null | undefined> {
    return await this.model
      ?.find({ ...filter }, project)
      .populate(populate ? this.populants : "");
  }

  /**
   * 
   * @param populate decides which fields to populate 
   * @returns null
   * @description hello description
   */
  async getOne({
    populate = false,
    filter,
    project,
  }: {
    populate?: boolean;
    filter?: FilterQuery<UserDocument>;
    project?: ProjectionType<UserDocument>;
  }): Promise<UserDocument | null | undefined> {
    return await this.model
      ?.findOne({ ...filter }, project)
      .populate(populate ? this.populants : "");
  }

  async update({
    filter,
    data,
  }: {
    filter: FilterQuery<UserDocument>;
    data: Partial<UserDocument>;
  }): Promise<UpdateResult | undefined | null> {
    return await this.model?.findOneAndUpdate(
      { ...filter },
      { ...data },
      { new: true }
    );
  }

  async count(filter: FilterQuery<UserDocument>): Promise<number | undefined> {
    return await this.model?.countDocuments({ ...filter });
  }

  async delete(
    filter: FilterQuery<UserDocument>
  ): Promise<DeleteResult | undefined> {
    return await this.model?.deleteOne({ ...filter });
  }
}
