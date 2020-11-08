export class Product {
  productId: number;
  isApproved: boolean; //Did an admin already approve the product?
  userName: string; //Name of the user who created the product
  productType: string; //Product or service, sell or lend
  title: string;
  price: number;
  payFreq: string; //hourly or daily
  // category: category;
  description: string;
  location: string;
  status: string; //sold or available
  delivery: boolean
  constructor(httpResponse: any) {
    this.productId = httpResponse.productID;
    this.isApproved = httpResponse.isApproved; //Did an admin already approve the product?
    this.userName = httpResponse.userName; //Name of the user who created the product
    this.productType = httpResponse.productType; //Product or service, sell or lend
    this.title = httpResponse.title;
    this.price = httpResponse.price;
    this.payFreq = httpResponse.payFreq; //hourly or daily
    // category: category;
    this.description = httpResponse.description;
    this.location = httpResponse.location;
    this.status = httpResponse.status; //sold or available
    this.delivery = httpResponse.delivery;
  }
}
