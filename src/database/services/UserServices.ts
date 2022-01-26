import { prisma } from "../../index";
import { IUserRequest } from "../../interfaces/User";
export default {
  async CreateUser(data: IUserRequest) {
    const hasUserByEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });
    const hasUserByCpf = await prisma.user.findUnique({
      where: { cpf: data.cpf },
    });
    return hasUserByEmail || hasUserByCpf ? null : prisma.user.create({ data });
  },
};
