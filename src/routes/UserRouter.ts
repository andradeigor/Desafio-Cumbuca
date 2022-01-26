import { Router } from "express";
import UserMiddleware from "../middleware/UserMiddle";

const router = Router();

router.post("/", UserMiddleware.CreateUserMiddleware);

export default router;
