export class User {
    isAdmin: boolean;
    userId: number;
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;
    street: string;
    zip: number;
    city: string;
    country: string;
    phone: string;
    wallet: number;
    constructor(httpResponse: any) {
      this.isAdmin = httpResponse.isAdmin;
      this.userId = httpResponse.userId; 
      this.userName = httpResponse.userName; 
      this.password = httpResponse.password; 
      this.email = httpResponse.email;
      this.firstName = httpResponse.firstName;
      this.lastName = httpResponse.lastName; 
      this.birthday = httpResponse.birthday;
      this.gender = httpResponse.gender;
      this.street = httpResponse.street; 
      this.zip = httpResponse.zip;
      this.city = httpResponse.city;
      this.country = httpResponse.country;
      this.phone = httpResponse.phone;
      this.wallet = httpResponse.wallet;
    }
  }
  