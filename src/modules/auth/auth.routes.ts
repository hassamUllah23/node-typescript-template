import { Express } from "express";
import { AuthController } from "./auth.controller";
import { RoutesInterface } from "../../utils";
import { ServerService } from "../../services";
// import { checkSchema } from "express-validator";

export class AuthRoutes implements RoutesInterface {
  controller: AuthController;
  server: Express;
  baseUrl: string;
  constructor() {
    this.baseUrl = "/auth";
    this.server = ServerService.getHttpServer();
    this.controller = new AuthController();
  }

  setup() {
    this.server.post(`${this.baseUrl}/login`, this.controller.login);
    // this.server.patch(
    //   `${this.baseUrl}/change-password`,
    //   [checkSchema({})],
    //   this.controller.changePassword,
    // );
  }
}
