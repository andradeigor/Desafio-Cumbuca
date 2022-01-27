import { Request, Response } from "express";
import AuthService from "../database/services/AuthServices";
import { IToken } from "../interfaces/Auth";
export default {
  async GetUser(req: Request, res: Response) {
    const id: IToken = res.locals.user;
    const User = await AuthService.GetUser(id);
    res.status(200).json(User);
  },
};
