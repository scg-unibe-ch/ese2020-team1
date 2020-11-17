export class UserNotification {
  notificationId: number;
  transactionId: number;
  sellerId: number;
  constructor(httpResponse: any) {
    this.notificationId = httpResponse.notificationId;
    this.transactionId = httpResponse.transactionId;
    this.sellerId = httpResponse.sellerId;
  }
}
