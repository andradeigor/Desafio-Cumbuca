import { Router } from "express";
import TransactionsController from "../controller/TransactionsController";
import AuthMiddle from "../middleware/AuthMiddle";
import TransactionMiddle from "../middleware/TransactionMiddle";
const router = Router();

router.post(
  "/",
  AuthMiddle.AuthMiddle,
  TransactionMiddle.CreateTransactionMiddleware,
  TransactionsController.CreateTransaction
);
router.post(
  "/reverse",
  AuthMiddle.AuthMiddle,
  TransactionMiddle.ReverseTransactionMiddleware,
  TransactionsController.ReverseTransaction
);
router.get("/", AuthMiddle.AuthMiddle, TransactionsController.GetTransactions);
export default router;
