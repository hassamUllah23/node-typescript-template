import { Express, Request, Response, NextFunction } from "express";
import { UsersController } from "./users.controller";
import { ServerService } from "../../services";

export class UserRoutes {
  controller: UsersController;
  server: Express;
  baseUrl: string;
  constructor() {
    this.baseUrl = "/users";
    this.server = ServerService.getHttpServer();
    this.controller = new UsersController();
  }

  setup() {
    this.server.post(
      `${this.baseUrl}/create`,
      // [middleware.roles.isAdmin],
      this.controller.create,
    );

    this.server.get(
      `${this.baseUrl}/list`,
      // [middleware.roles.isAdmin],
      (req: Request, res: Response, _next: NextFunction) =>
        this.controller.getList(req, res),
    );

    this.server.get(
      `${this.baseUrl}/user`,
      // [middleware.roles.isAdminOrClient],
      this.controller.getOne,
    );

    this.server.delete(
      `${this.baseUrl}/delete`,
      // [middleware.roles.isAdmin],
      (req: Request, res: Response, _next: NextFunction) =>
        this.controller.delete(req, res),
    );
  }
}
