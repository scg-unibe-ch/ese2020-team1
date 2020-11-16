import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Transaction } from '../../models/transaction.model';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { LoggedInCheckerService } from '../../auth/logged-in-checker.service';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PurchaseService } from './purchase.service';

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

  transaction: Transaction;


  specificationForm: FormGroup; //In case of timebased product/service, the buyer indicates the total hours/days
  checkoutForm: FormGroup; //The transaction is confirmed and the user enters the necessary details for the transaction

  constructor(private router: Router, private loggedInCheckerService: LoggedInCheckerService, private purchasService: PurchaseService, private fb: FormBuilder) {

  }

  ngOnInit(): void { 
    //Store the product
    this.product = window.history.state;

    this.totalPrice = this.product.price;

    if (this.product.productType == "Product (lend)" || this.product.productType == "Service (time-based)") {
      this.timeBased = true;

      if (this.product.payFreq == "Hourly") {
        this.hourly = true;
      }
      if (this.product.payFreq == "Daily") {
        this.daily = true;
      }
    }

    this.loggedInCheckerService.getUser().subscribe(user => {
      this.buyer = user;
      this.createForms();
      this.onChanges();
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
      street: new FormControl(this.buyer.street, Validators.required)
    })
  }

  uponConfirmOrder(): void {

    this.purchasService.purchaseProduct(new Transaction(
      0,
      this.product.productId,
      this.product.userId,
      this.buyer.userId,
      this.checkoutForm.get('buyerStreet').value,
      this.checkoutForm.get('buyerZip').value,
      this.checkoutForm.get('buyerCity').value,
      this.checkoutForm.get('buyerCountry').value,
      this.totalPrice,
      this.checkoutForm.get('messageToSeller').value
    )).subscribe(confirmed => this.transaction = confirmed);
  }
}
