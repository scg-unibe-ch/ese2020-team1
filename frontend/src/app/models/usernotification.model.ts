import { Product } from './product.model';
import { Transaction } from './transaction.model';


export class UserNotification {
  notificationId: number;
  transactionId: number;
  sellerId: number;
  product: Product;
  transaction: Transaction;

  constructor(httpResponse: any) {
    this.notificationId = httpResponse.notificationId;
    this.transactionId = httpResponse.transactionId;
    this.sellerId = httpResponse.sellerId;
  }
}
