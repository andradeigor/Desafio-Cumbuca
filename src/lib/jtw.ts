import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default {
  async CreateToken(id: string) {
    const token: string = jwt.sign({ data: id }, process.env.SECRET as string, {
      expiresIn: "1h",
    });
    return token;
  },
};
