import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { LoggedInCheckerService } from '../../auth/logged-in-checker.service';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProductService } from '../product.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.css']
})
export class ProductPurchaseComponent implements OnInit {

  isLinear: boolean = false; //Necessary for angular stepper
  purchaseDenied: boolean = false; //Set to true if the total price exceeds the saldo of the buyer

  productId: number;
  product: Product;
  buyer: User;
  transaction: Transaction;

  timeBased: boolean = false;; //Set to true if product/service is time-based
  hourly: boolean = false; //Set to true if Product/service is paid hourly
  daily: boolean = false; //Set to true if product/service is paid daily

  totalPrice: number;
  time: number = 1;

  //specificationForm: FormGroup; //In case of timebased product/service, the buyer indicates the total hours/days
  checkoutForm: FormGroup; //The transaction is confirmed and the user enters the necessary details for the transaction

  constructor(
    private router: Router,
    private loggedInCheckerService: LoggedInCheckerService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void { 
    //Store the product
    this.activeRoute.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.productService.getProductById(this.productId).subscribe(result => {
        this.product = result;

        this.totalPrice = this.product.price;
        //Check what type of product/service it is on order to adapt the html accordingly
        if (this.product.productType == "Product (lend)" || this.product.productType == "Service (time-based)") {
          this.timeBased = true;

          if (this.product.payFreq == "Hourly") {
            this.hourly = true;
          }
          if (this.product.payFreq == "Daily") {
            this.daily = true;
          }
        }

        //Get all the user details from the backend
        this.loggedInCheckerService.getUser().subscribe(user => {
          this.buyer = user;


          //Create the forms
          this.createForms();
        });
      });
    });

    


    

  }



  //Create the inputform for the 
  createForms(): void {

    //Reactive Forms with validation
    //this.createSpecificationForm();
    this.createCheckoutForm();
  }


  createCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      firstname: new FormControl(this.buyer.firstName, Validators.required),
      lastname: new FormControl(this.buyer.lastName, Validators.required),
      street: new FormControl(this.buyer.street, Validators.required),
      zip: new FormControl(this.buyer.zip, Validators.compose([
        Validators.pattern(/^[0-9]\d*$/),
        Validators.required
      ])),
      city: new FormControl(this.buyer.city, Validators.required),
      country: new FormControl(this.buyer.country, Validators.required),
      message: new FormControl("", Validators.maxLength(300))
    });
  }

  uponConfirmOrder(): void {
    this.totalPrice = this.time * this.product.price;

    this.httpClient.post(environment.endpointURL + 'purchase', {
      productId: this.product.productId,
      productTitle: this.product.title,
      productType: this.product.productType,
      sellerId: this.product.userId,
      buyerId: this.buyer.userId,
      buyerUserName: this.buyer.userName,
      buyerFirstName: this.checkoutForm.get('firstname').value,
      buyerLastName: this.checkoutForm.get('lastname').value,
      buyerStreet: this.checkoutForm.get('street').value,
      buyerZip: this.checkoutForm.get('zip').value,
      buyerCity: this.checkoutForm.get('city').value,
      buyerCountry: this.checkoutForm.get('country').value,
      time: this.totalPrice,
      totalPrice: this.totalPrice,
      messageToSeller: this.checkoutForm.get('message').value,
      delivery: this.product.delivery,
      payFreq: this.product.payFreq,
      confirmed: (this.product.productType === "Product (sell)") //If product is for sale then no confirmation of the transaction is needed
    }).subscribe();
  }
}
