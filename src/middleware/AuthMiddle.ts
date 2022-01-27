import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import LibJwt from "../lib/jtw";
export default {
  async AuthMiddle(req: Request, res: Response, next: NextFunction) {
    try {
      const [, token] = req.headers.authorization!.split(" ");
      const Id = await LibJwt.DecriptToken(token);
      res.locals.user = Id;
      next();
    } catch (_e) {
      res.status(400).json({ error: "malformed token or expired" });
    }
  },
  async LoginMiddle(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const options = {
      abortEarly: false,
    };
    const { error } = schema.validate(req.body, options);
    if (error) {
      res.status(400).json({
        error: `Validation error: ${error.details
          .map((error) => error.message)
          .join(", ")}`,
      });
    } else {
      next();
    }
  },
};
