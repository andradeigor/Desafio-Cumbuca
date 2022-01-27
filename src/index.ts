import express from "express";
import { PrismaClient } from "@prisma/client";
import UserRouter from "./routes/UserRouter";
import AuthRouter from "./routes/AuthRouter";
const app = express();
export const prisma = new PrismaClient();
app.use(express.json());
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);
app.listen(3000, () => {
  console.log("🔥 Hi, I'm running at http://localhost:3000/ 🔥");
});
