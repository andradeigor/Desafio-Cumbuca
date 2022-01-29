import { Transactions } from "@prisma/client";
import { Request, Response } from "express";
import { IToken } from "../interfaces/Auth";
import TransactionService from "../database/services/TransactionsServices";
import { IDateTransaction } from "../interfaces/Transactions";

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
      : res.status(400).json({ error: "insufficient funds or invalid ids" });
  },
  async ReverseTransaction(req: Request, res: Response) {
    const id: IToken = res.locals.user;
    const data = req.body;
    data.id = id.data;
    const reversed = await TransactionService.ReverseTransaction(data);
    reversed
      ? res.status(200).json(reversed)
      : res
          .status(400)
          .json({ error: "Invalid ids or transaction already reversed" });
  },
  async DateTransaction(req: Request, res: Response) {
    const data = req.body;
    const id: IToken = res.locals.user;
    const DateTransactionData: IDateTransaction = { ...data, id: id.data };
    const Transactions = await TransactionService.DateTransaction(
      DateTransactionData
    );
    res.status(200).json(Transactions);
  },
};
