import { Transaction } from './transaction.model';


export class PurchaseRequest {
  requestId: number;
  transactionId: number;
  sellerId: number;
  transaction: Transaction;

  constructor(httpResponse: any) {
    this.requestId = httpResponse.requestId;
    this.transactionId = httpResponse.transactionId;
    this.sellerId = httpResponse.sellerId;
  }
}
