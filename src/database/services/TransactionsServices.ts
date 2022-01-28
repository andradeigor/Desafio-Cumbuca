import { prisma } from "../../index";
import { IToken } from "../../interfaces/Auth";
import { Transactions, Users } from "@prisma/client";
import { ICreateTransactionsData } from "../../interfaces/Transactions";

export default {
  async GetTransactions(id: IToken) {
    const Transactions: Array<Transactions> =
      await prisma.transactions.findMany({
        where: { OR: [{ from: id.data }, { for: id.data }] },
      });
    return Transactions;
  },
  async CreateTransaction(data: ICreateTransactionsData) {
    const User = await prisma.users.findUnique({
      where: { id: data.from },
    });
    if (!User) {
      return null;
    }
    if (User?.saldo.toNumber() < data.value) {
      return null;
    }
    const Transactions = await prisma.transactions.create({ data });
    const RemovedValue = await prisma.users.update({
      where: {
        id: data.from,
      },
      data: {
        saldo: User.saldo.toNumber() - data.value,
      },
    });
    const AddedValue = await prisma.users.update({
      where: {
        id: data.for,
      },
      data: {
        saldo: User.saldo.toNumber() + data.value,
      },
    });
    return Transactions;
  },
};
