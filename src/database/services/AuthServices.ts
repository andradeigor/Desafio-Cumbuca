import { User } from "@prisma/client";
import { prisma } from "../../index";
import { ILoginUser, IToken } from "../../interfaces/Auth";
import LibJwt from "../../lib/jtw";
import LibBcrypt from "../../lib/bcrypt";
export default {
  async GetUser(id: IToken) {
    const User = await prisma.user.findUnique({ where: { id: id.data } });
    User!.password = "";
    return User;
  },

  async LoginUser(data: ILoginUser) {
    const User = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (!User) {
      return null;
    }
    const RightPassword: boolean = await LibBcrypt.decript(
      data.password,
      User.password
    );
    return RightPassword ? this.GetUserToken(User) : null;
  },
  async GetUserToken(User: User) {
    const hasToken = await prisma.token.findUnique({
      where: { userId: User.id },
    });
    if (!hasToken) {
      return LibJwt.CreateToken(User.id);
    }
    const Token = hasToken.token;
    try {
      const TokenDecripted = await LibJwt.DecriptToken(Token);
      return Token;
    } catch (error) {
      const NewToken = await LibJwt.CreateToken(User.id);
      const deleted = await prisma.token.delete({ where: { id: hasToken.id } });
      const NewTokenDb = await prisma.token.create({
        data: { token: NewToken, userId: User.id },
      });
      return NewToken;
    }
  },
};
