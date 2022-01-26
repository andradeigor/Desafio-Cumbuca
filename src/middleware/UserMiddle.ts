import { NextFunction, Request, Response } from "express";
import { validate } from "gerador-validador-cpf";
import Joi from "joi";

export default {
  async CreateUserMiddleware(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      cpf: Joi.string().length(11).required(),
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
    } else if (!validate(req.body.cpf)) {
      res.status(400).json({
        error: "invalid cpf",
      });
    } else {
      next();
    }
  },
};
