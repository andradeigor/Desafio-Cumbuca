import { prisma } from "../../index";
import { IToken } from "../../interfaces/Auth";
import { Transactions, Users } from "@prisma/client";
import {
  ICreateTransactionsData,
  IReverseTransactionData,
} from "../../interfaces/Transactions";

export default {
  async GetTransactions(id: IToken) {
    const Transactions: Array<Transactions> =
      await prisma.transactions.findMany({
        where: {
          OR: [
            { from: id.data, reversed: false },
            { for: id.data, reversed: false },
          ],
        },
      });
    return Transactions;
  },
  async CreateTransaction(data: ICreateTransactionsData) {
    const User = await prisma.users.findUnique({
      where: { id: data.from },
    });
    try {
      const UserFor = await prisma.users.findUnique({
        where: { id: data.for },
      });
    } catch (er) {
      return null;
    }
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
  async ReverseTransaction(data: IReverseTransactionData) {
    try {
      const Transaction = await prisma.transactions.findUnique({
        where: { id: data.transactionId },
      });
      if (Transaction?.reversed || Transaction?.from != data.id) {
        return null;
      }
      const UserFrom = await prisma.users.findUnique({
        where: { id: Transaction.from },
      });
      const UserFor = await prisma.users.findUnique({
        where: { id: Transaction.for },
      });
      if (!UserFrom || !UserFor) {
        return null;
      }
      const UpdatedValueFrom = await prisma.users.update({
        where: {
          id: UserFrom.id,
        },
        data: {
          saldo: UserFrom.saldo.toNumber() + Transaction.value.toNumber(),
        },
      });
      const UpdatedValueFor = await prisma.users.update({
        where: {
          id: UserFor.id,
        },
        data: {
          saldo: UserFor.saldo.toNumber() - Transaction.value.toNumber(),
        },
      });
      const UptatedTransaction = await prisma.transactions.update({
        where: { id: Transaction.id },
        data: { reversed: true },
      });
      return UptatedTransaction;
    } catch (error) {
      return null;
    }
  },
};
