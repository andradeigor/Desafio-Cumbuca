import { Request, Response } from "express";
import AuthService from "../database/services/AuthServices";
import { ILoginUser, IToken } from "../interfaces/Auth";
export default {
  async GetUser(req: Request, res: Response) {
    const id: IToken = res.locals.user;
    const User = await AuthService.GetUser(id);
    res.status(200).json(User);
  },
  async LoginUser(req: Request, res: Response) {
    const data: ILoginUser = req.body;
    const Token = await AuthService.LoginUser(data);
    Token
      ? res.status(200).json({ token: Token })
      : res.status(400).json({ error: "Invalid email or password" });
  },
};
