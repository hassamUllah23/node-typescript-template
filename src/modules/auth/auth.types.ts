import { UserDocument } from "../../database";

export type LoginParams = {
  email: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  userId: string;
  role: string;
  user: UserDocument;
};

export type ChangePasswordParams = {
  id: string;
  oldPassword: string;
  newPassword: string;
};
