import { Router } from "express";
import AuthController from "../controller/AuthController";
import AuthMiddle from "../middleware/AuthMiddle";

const router = Router();

router.get("/", AuthMiddle.AuthMiddle, AuthController.GetUser);

export default router;
