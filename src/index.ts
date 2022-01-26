import express from "express";
import { PrismaClient } from "@prisma/client";
import UserRouter from "./routes/UserRouter";

const app = express();
export const prisma = new PrismaClient();
app.use(express.json());
app.use("/user", UserRouter);
app.listen(3000, () => {
  console.log("🔥 Hi, I'm running at http://localhost:3000/ 🔥");
});
