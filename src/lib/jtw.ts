import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default {
  async CreateToken(id: string) {
    const token: string = jwt.sign({ data: id }, process.env.SECRET as string, {
      expiresIn: "1h",
    });
    return token;
  },
  async DecriptToken(token: string) {
    const id: string | JwtPayload = jwt.verify(
      token,
      process.env.SECRET as string
    );
    return id;
  },
};
