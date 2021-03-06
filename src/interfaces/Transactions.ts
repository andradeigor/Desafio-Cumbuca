export interface ICreateTransactionsData {
  from: string;
  for: string;
  value: number;
}

export interface IReverseTransactionData {
  transactionId: string;
  id: string;
}

export interface IDateTransaction {
  id: string;
  after: Date;
  before: Date;
}
