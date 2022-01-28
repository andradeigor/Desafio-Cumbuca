import { Transactions } from "@prisma/client";
import { Request, Response } from "express";
import { IToken } from "../interfaces/Auth";
import TransactionService from "../database/services/TransactionsServices";

export default {
  async GetTransactions(req: Request, res: Response) {
    const id: IToken = res.locals.user;
    const Transactions: Array<Transactions> =
      await TransactionService.GetTransactions(id);
    res.status(200).json(Transactions);
  },

  async CreateTransaction(req: Request, res: Response) {
    const id: IToken = res.locals.user;
    let data = req.body;
    data = { ...data, from: id.data };
    const Transaction = await TransactionService.CreateTransaction(data);
    Transaction
      ? res.status(201).json(Transaction)
      : res.status(400).json({ error: "insufficient funds or invalid id" });
  },
};
