export class Transaction {
  transactionId: number;
  buyerId: number;
  buyerFirstName: string;
  buyerLastName: string;
  buyerStreet: string;
  buyerZip: string;
  buyerCity: string;
  buyerCountry: string;
  totalPrice: number;
  time: number;
  messageToSeller: string;

  constructor(httpResponse: any) {
    this.transactionId = httpResponse.transactionId;
    this.buyerId = httpResponse.buyerId;
    this.buyerFirstName = httpResponse.buyerFirstName;
    this.buyerLastName = httpResponse.buyerLastName;
    this.buyerStreet = httpResponse.buyerStreet;
    this.buyerZip = httpResponse.buyerZip;
    this.buyerCity = httpResponse.buyerCity;
    this.buyerCountry = httpResponse.buyerCountry;
    this.totalPrice = httpResponse.totalPrice;
    this.time = httpResponse.time;
    this.messageToSeller = httpResponse.messageToSeller;
  }
}
