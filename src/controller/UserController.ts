import { Request, Response } from "express";
import UserServices from "../database/services/UserServices";
import { IUserRequest } from "../interfaces/User";
export default {
  async CreateUser(req: Request, res: Response) {
    const data: IUserRequest = req.body;
    const NewUser = await UserServices.CreateUser(data);
    NewUser
      ? res.status(201).send()
      : res.status(400).json({ error: "Email or Cpf Already used" });
  },
};
