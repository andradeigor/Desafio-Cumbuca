import { NextFunction, Request, Response } from "express";
import { validate } from "gerador-validador-cpf";
import Joi from "joi";

export default {
  async CreateTransactionMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      for: Joi.string().required(),
      value: Joi.number().required(),
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
  async ReverseTransactionMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      transactionId: Joi.string().required(),
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
  async DateTransactionMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      after: Joi.date().required(),
      before: Joi.date().required(),
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
