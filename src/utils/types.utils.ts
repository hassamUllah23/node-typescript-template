import { DeleteResult, UpdateResult } from "mongodb";
import { FilterQuery, ProjectionType } from "mongoose";

interface RoutesInterface {
  setup(): void;
  baseUrl: string;
  controller: any;
}

interface RepositoryInterface<Model, Document> {
  model: Model | undefined;

  getList({
    populate,
    filter,
    project,
  }: {
    populate?: boolean;
    filter?: FilterQuery<Document>;
    project?: ProjectionType<Document>;
  }): Promise<Array<Document> | null | undefined>;

  getOne({
    populate,
    filter,
    project,
  }: {
    populate?: boolean;
    filter?: FilterQuery<Document>;
    project?: ProjectionType<Document>;
  }): Promise<Document | null | undefined>;

  update({
    filter,
    data,
  }: {
    filter: FilterQuery<Document>;
    data: Partial<Document>;
  }): Promise<UpdateResult | undefined | null>;

  count(filter: FilterQuery<Document>): Promise<number | undefined>;

  delete(filter: FilterQuery<Document>): Promise<DeleteResult | undefined>;
}
export { RoutesInterface, RepositoryInterface };
