import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { LoggedInCheckerService } from '../../auth/logged-in-checker.service';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.css']
})
export class ProductPurchaseComponent implements OnInit {

  isLinear: boolean = false; //Necessary for angular stepper


  product: Product;
  buyer: User;

  timeBased: boolean = false;; //Set to true if product/service is time-based
  hourly: boolean = false; //Set to true if Product/service is paid hourly
  daily: boolean = false; //Set to true if product/service is paid daily

  totalPrice: number;

  specificationForm: FormGroup; //In case of timebased product/service, the buyer indicates the total hours/days
  checkoutForm: FormGroup; //The transaction is confirmed and the user enters the necessary details for the transaction

  constructor(private router: Router, private loggedInCheckerService: LoggedInCheckerService, private httpClient: HttpClient, private fb: FormBuilder) {

  }

  ngOnInit(): void { 
    //Store the product
    this.product = window.history.state;

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

      this.onChanges(); //Called if input values change

    });

  }

  onChanges(): void {

    this.specificationForm.valueChanges.subscribe(val => {
      this.totalPrice = val.time * this.totalPrice;
    });
    
  }


  //Create the inputform for the 
  createForms(): void {

    //Reactive Forms with validation
    this.createSpecificationForm();
    this.createCheckoutForm();
  }

  createSpecificationForm(): void {
      this.specificationForm = this.fb.group({
        time: new FormControl(1, Validators.compose([
          Validators.pattern(/^[0-9]\d*$/),
          Validators.required
        ]))
      });
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

    this.httpClient.post(environment.endpointURL + 'purchase', {
      productId: this.product.productId,
      sellerId: this.product.userId,
      buyerId: this.buyer.userId,
      buyerFirstName: this.checkoutForm.get('firstname').value,
      buyerLastName: this.checkoutForm.get('lastname').value,
      buyerStreet: this.checkoutForm.get('street').value,
      buyerZip: this.checkoutForm.get('zip').value,
      buyerCity: this.checkoutForm.get('city').value,
      buyerCountry: this.checkoutForm.get('country').value,
      totalPrice: this.totalPrice,
      messageToSeller: this.checkoutForm.get('message').value
    }).subscribe();
  }
}