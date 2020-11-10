import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ParentErrorStateMatcher } from '../../user/user-registration/validators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BrowseComponent } from '../../browse/browse.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-modification',
  templateUrl: './product-modification.component.html',
  styleUrls: ['./product-modification.component.css']
})
export class ProductModificationComponent implements OnInit {

  //The product id will be passed from the parent component
  productId: number = 8;

  @Input()
  product: Product = new Product({
    "productId": 8,
    "isApproved": "approved",
    "userName": "pasci93",
    "productType": "Product (lend)",
    "title": "Ski",
    "price": 200,
    "payFreq": "Daily",
    "description": "I lend my skis (HEAD, 168 cm) on a daily basis",
    "location": "Bern",
    "status": "availabe",
    "delivery": true,
    "userId": null,
    "createdAt": "2020-11-09T20:31:42.835Z",
    "updatedAt": "2020-11-09T20:39:31.727Z"
  });

  //Create product modification form
  productModificationForm: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  //For notifying the user if the modification was successful
  alert: boolean = false;

  types = [
    "",
    "Product (sell)",
    "Product (lend)",
    "Service (onetime)",
    "Service (time-based)"
  ];


  paymentBases = [
    "",
    "Unique",
    "Hourly",
    "Daily"
  ];

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.createForms();
  }


  createForms() {
    this.productModificationForm = this.fb.group({
      type: new FormControl(this.product.productType, Validators.required),
      name: new FormControl(this.product.title, Validators.required),
      price: new FormControl(this.product.price, Validators.compose([
        Validators.pattern(/^[0-9]\d*$/),
        Validators.required
      ])),
      paymentBasis: new FormControl(this.product.payFreq, Validators.required),
      description: new FormControl(this.product.description, Validators.compose([
        Validators.maxLength(300),
        Validators.required
      ])),
      location: new FormControl(this.product.location, Validators.required),
      delivery: new FormControl(this.product.delivery, Validators.nullValidator)
    });
  }

  onSubmitProductDetails(value): void {


    this.httpClient.put(environment.endpointURL + 'product/modify/' + this.product.productId, {
      productType: this.productModificationForm.get('type').value,
      title: this.productModificationForm.get('name').value,
      price: this.productModificationForm.get('price').value,
      payFreq: this.productModificationForm.get('paymentBasis').value,
      description: this.productModificationForm.get('description').value,
      location: this.productModificationForm.get('location').value,
      status: "availabe",
      delivery: this.productModificationForm.get('delivery').value,

    }).subscribe((res: any) => {
      this.alert = true;
      this.product = res;
    });
  }
  closeAlert() {
    this.alert = false;
  }

}
