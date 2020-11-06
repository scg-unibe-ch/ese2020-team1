export class Product {

  constructor(
    productId: number,
    isApproved: boolean, //Did an admin already approve the product?
    userName: string, //Name of the user who created the product
    productType: string, //Product or service, sell or lend
    title: string,
    price: number,
    payFreq: string, //hourly or daily
    // category: category;
    description: string,
    location: string,
    status: string, //sold or available
    delivery: boolean
  ) { }
}
