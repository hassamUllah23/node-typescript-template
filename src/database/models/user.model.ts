import { Document, Model, Schema, model } from "mongoose";
import { RolesEnum } from "../../utils";

interface UserDocument extends Partial<Document> {
  _id?: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const collectionName = "Users";
const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: RolesEnum, required: true },
  },
  {
    collection: collectionName,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false,
  }
);

const User: Model<UserDocument> = model(collectionName, userSchema);
export { User };
export type { UserDocument };
