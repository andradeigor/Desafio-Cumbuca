import { prisma } from "../../index";
import { IToken } from "../../interfaces/Auth";

export default {
  async GetUser(id: IToken) {
    const User = await prisma.user.findUnique({ where: { id: id.data } });
    User!.password = "";
    return User;
  },
};
