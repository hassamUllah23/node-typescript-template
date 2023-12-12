import {
  ChangePasswordParams,
  LoginParams,
  LoginResponse,
  encryptPassword,
  generateToken,
  verifyPassword,
} from ".";
import { LogService } from "../../services";
import { RolesEnum } from "../../utils";
import { UsersService } from "../users";

export class AuthService {
  private readonly usersService: UsersService | undefined;
  constructor() {
    this.usersService = new UsersService();
  }

  async login(data: LoginParams): Promise<LoginResponse | undefined> {
    console.log(data);
    try {
      const user = await this.usersService?.getOne({
        email: data.email,
      });
      if (user) {
        if (await verifyPassword(data.password, user.password)) {
          const token = await generateToken({ id: "hello" });
          return {
            token: token,
            userId: user.id,
            role: user.role,
            user: user,
          };
        } else {
          throw Error("Incorrect Password");
        }
      } else {
        throw Error("Unidentified Email");
      }
    } catch (error) {
      LogService.log("error", error as string);
      return undefined;
    }
  }

  async changePassword(data: ChangePasswordParams) {
    const user = await this.usersService?.getOne({
      _id: data.id,
      role: RolesEnum.USER,
    });

    if (user) {
      if (await verifyPassword(data.oldPassword, user?.password as string)) {
        const newUser = await this.usersService?.update(data.id, {
          password: await encryptPassword(data.newPassword),
        });
        if (newUser) {
          return "Password changed succesfully";
        } else {
          throw Error("Failed to update password");
        }
      } else {
        throw Error("Incorrect Old Password");
      }
    } else {
      throw Error("Unidentified email");
    }
  }
}
