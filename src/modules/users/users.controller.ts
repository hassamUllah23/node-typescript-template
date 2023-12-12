import { UsersService } from ".";
import { User } from "../../database";
import { LogService } from "../../services";
import {
  send500error,
  sendApiResponseMessage,
  sendCreateSuccess,
  sendDeleteError,
  sendDeleteSuccess,
  sendNotFoundError,
} from "../../utils";
import { Request, Response } from "express";

export class UsersController {
  private readonly service: UsersService;

  constructor() {
    this.service = new UsersService();
  }
  async getList(req: Request, res: Response) {
    try {
      const array = await this.service?.getList({ ...req.query });
      res.status(200).send(array);
    } catch (error) {
      LogService.log("error", error as string);
      res.status(500).send(send500error());
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const user = await this.service?.getOne({ ...req.query });
      user
        ? res.status(200).send(user)
        : res.status(400).send(sendApiResponseMessage(""));
    } catch (error) {
      res.status(500).send(send500error());
      LogService.log("error", error as string);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const result = await this.service?.create({ ...req.body });
      result
        ? res.status(200).send(sendCreateSuccess(User.name))
        : res.status(400).send(sendNotFoundError(User.name));
    } catch (error) {
      res.status(500).send(send500error());
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await this.service?.update(req.query.id as string, {
        ...req.body,
      });

      if (result?.matchedCount !== 0) {
        result?.modifiedCount === 0
          ? res.status(400).send(sendDeleteError(User.name))
          : res.status(200).send(sendDeleteSuccess(User.name));
        return;
      } else {
        res.status(400).send(sendNotFoundError(User.name));
      }
    } catch (error) {
      res.status(500).send(send500error());
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await this.service?.delete({ ...req.query });
      result?.deletedCount === 0
        ? res.status(400).send(sendDeleteError(User.name))
        : res.status(200).send(sendDeleteSuccess(User.name));
    } catch (error) {
      res.status(500).send(send500error());
    }
  }
}
