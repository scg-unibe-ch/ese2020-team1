export class Transaction {
  transactionId: number;
  productId: number;
  productTitle: string;
  productType: string;
  buyerId: number;
  buyerUserName: string;
  buyerFirstName: string;
  buyerLastName: string;
  buyerStreet: string;
  buyerZip: string;
  buyerCity: string;
  buyerCountry: string;
  totalPrice: number;
  time: number;
  messageToSeller: string;
  delivery: boolean;
  payFreq: string;
  confirmed: boolean;

  constructor(httpResponse: any) {
    this.transactionId = httpResponse.transactionId;
    this.productId = httpResponse.productId;
    this.productTitle= httpResponse.productTitle;
    this.productType= httpResponse.productType;
    this.buyerId = httpResponse.buyerId;
    this.buyerUserName = httpResponse.buyerUserName;
    this.buyerFirstName = httpResponse.buyerFirstName;
    this.buyerLastName = httpResponse.buyerLastName;
    this.buyerStreet = httpResponse.buyerStreet;
    this.buyerZip = httpResponse.buyerZip;
    this.buyerCity = httpResponse.buyerCity;
    this.buyerCountry = httpResponse.buyerCountry;
    this.totalPrice = httpResponse.totalPrice;
    this.time = httpResponse.time;
    this.messageToSeller = httpResponse.messageToSeller;
    this.delivery = httpResponse.delivery;
    this.payFreq = httpResponse.payFreq;
    this.confirmed = httpResponse.confirmed;
  }
}
