import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Transaction } from '../../models/transaction.model';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { LoggedInCheckerService } from '../../auth/logged-in-checker.service';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.css']
})
export class ProductPurchaseComponent implements OnInit {

  product: Product;
  buyer: User;
  transaction: Transaction;
  specificationForm: FormGroup; //In case of timebased product/service, the buyer indicates the total hours/days

  constructor(private router: Router, private loggedInCheckerService: LoggedInCheckerService) {

  }

  ngOnInit(): void { 

    //Store the product
    this.product = window.history.state;
    //Store the 
    this.loggedInCheckerService.getUser().subscribe(user => {
      this.buyer = user;
      this.createForms();
    });
  }


  //Create the inputform for the 
  createForms(): void {
    //Reactive Forms with validation
    this.createSpecificationForm();
    this.createCheckoutForm();
  }

  createSpecificationForm(): void { }

  createCheckoutForm(): void { }


}
