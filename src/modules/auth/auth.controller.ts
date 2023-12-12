import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LogService } from "../../services";
import { send500error, sendApiResponseMessage } from "../../utils";

export class AuthController {
  service: AuthService;
  constructor() {
    this.service = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.service?.login({ ...req.body });
      res.status(200).send({ ...result });
    } catch (error: any) {
      LogService.log("error", error as string);
      res
        .status(500)
        .send(
          error?.message
            ? sendApiResponseMessage(error.message as string)
            : send500error()
        );
    }
  }
  async changePassword(req: Request, res: Response) {
    try {
      const result = await this.service?.changePassword({ ...req.body });
      res.status(200).send(sendApiResponseMessage(result as string));
      return;
    } catch (error: any) {
      res
        .status(400)
        .send(
          error.message
            ? sendApiResponseMessage(error.messagege)
            : send500error()
        );
    }
  }
}
