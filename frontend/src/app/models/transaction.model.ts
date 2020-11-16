export class Transaction {
  transactionId: number;
  productId: number;
  sellerId: number;
  buyerId: number;
  buyerStreet: string;
  buyerZip: number;
  buyerCity: string;
  buyerCountry: string;
  totalPrice: number;
  messageToSeller: string;
  constructor(transactionId: number,
    productId: number,
    sellerId: number,
    buyerId: number,
    buyerStreet: string,
    buyerZip: number,
    buyerCity: string,
    buyerCountry: string,
    totalPrice: number,
    messageToSeller: string) { }
}
