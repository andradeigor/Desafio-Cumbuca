import { prisma } from "../../index";
import { IToken } from "../../interfaces/Auth";
import { IUserRequest } from "../../interfaces/User";
import LibBcrypt from "../../lib/bcrypt";
import LibJwt from "../../lib/jtw";
export default {
  async GetUser(id: IToken) {
    const User = await prisma.user.findUnique({ where: { id: id.data } });
    User!.password = "";
    return User;
  },
};
