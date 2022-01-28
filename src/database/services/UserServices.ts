import { prisma } from "../../index";
import { IUserRequest } from "../../interfaces/User";
import LibBcrypt from "../../lib/bcrypt";
import LibJwt from "../../lib/jtw";
export default {
  async CreateUser(data: IUserRequest) {
    const hasUserByEmail = await prisma.users.findUnique({
      where: { email: data.email },
    });
    const hasUserByCpf = await prisma.users.findUnique({
      where: { cpf: data.cpf },
    });
    return hasUserByEmail || hasUserByCpf
      ? null
      : this.CreateUserWithBcrypt(data);
  },
  async CreateUserWithBcrypt(data: IUserRequest) {
    data.email = data.email.toLowerCase();
    const hashedPassword = await LibBcrypt.encrypt(data.password);
    const newUser = await prisma.users.create({
      data: { ...data, password: hashedPassword },
    });
    const userToken = await LibJwt.CreateToken(newUser.id);
    const TokenData = {
      token: userToken,
      userId: newUser.id,
    };
    const UserTokenInDb = await prisma.tokens.create({ data: TokenData });
    newUser.password = "";
    return { ...newUser, token: UserTokenInDb.token };
  },
};
