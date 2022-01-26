import { Router } from "express";
import UserController from "../controller/UserController";
import UserMiddleware from "../middleware/UserMiddle";

const router = Router();

router.post(
  "/",
  UserMiddleware.CreateUserMiddleware,
  UserController.CreateUser
);

export default router;
