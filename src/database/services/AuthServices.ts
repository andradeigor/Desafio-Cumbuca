import { prisma } from "../../index";
import { ILoginUser, IToken } from "../../interfaces/Auth";
import LibJwt from "../../lib/jtw";
import LibBcrypt from "../../lib/bcrypt";
import { Users } from "@prisma/client";
export default {
  async GetUser(id: IToken) {
    const User = await prisma.users.findUnique({ where: { id: id.data } });
    User!.password = "";
    return User?.saldo;
  },

  async LoginUser(data: ILoginUser) {
    const User = await prisma.users.findUnique({
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
  async GetUserToken(User: Users) {
    const hasToken = await prisma.tokens.findUnique({
      where: { userId: User.id },
    });
    if (!hasToken) {
      const NewToken = await LibJwt.CreateToken(User.id);
      const NewTokenDb = await prisma.tokens.create({
        data: { token: NewToken, userId: User.id },
      });
      return NewToken;
    }
    const Token = hasToken.token;
    try {
      const TokenDecripted = await LibJwt.DecriptToken(Token);
      return Token;
    } catch (error) {
      const NewToken = await LibJwt.CreateToken(User.id);
      const deleted = await prisma.tokens.delete({
        where: { id: hasToken.id },
      });
      const NewTokenDb = await prisma.tokens.create({
        data: { token: NewToken, userId: User.id },
      });
      return NewToken;
    }
  },
};
