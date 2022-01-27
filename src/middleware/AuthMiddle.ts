import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import LibJwt from "../lib/jtw";
export default {
  async AuthMiddle(req: Request, res: Response, next: NextFunction) {
    try {
      const [, token] = req.headers.authorization!.split(" ");
      const Id = await LibJwt.DecriptToken(token);
      res.locals.user = Id;
      next();
    } catch (_e) {
      res.status(400).json({ error: "malformed token" });
    }
  },
};
