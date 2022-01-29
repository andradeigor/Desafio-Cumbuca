import { Request, Response } from "express";
import AuthService from "../database/services/AuthServices";
import { ILoginUser, IToken } from "../interfaces/Auth";
export default {
  async GetUser(req: Request, res: Response) {
    const id: IToken = res.locals.user;
    const saldo = await AuthService.GetUser(id);
    saldo
      ? res.status(200).json({ saldo })
      : res.status(400).json({ error: "Invalid id" });
  },
  async LoginUser(req: Request, res: Response) {
    const data: ILoginUser = req.body;
    const Token = await AuthService.LoginUser(data);
    Token
      ? res.status(200).json({ token: Token })
      : res.status(400).json({ error: "Invalid email or password" });
  },
};
