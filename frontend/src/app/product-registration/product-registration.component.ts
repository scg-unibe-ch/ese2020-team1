import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent implements OnInit {

  productDetailsForm: FormGroup;
  types = [
    "Product",
    "Service"
  ];
  paymentTypes = [
    "Sell",
    "Lend"
  ]
  paymentBases = [
    "Unique",
    "Hourly",
    "Daily"
  ]
  statuses = [
    "available",
    "sold"
  ]


  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.createForms();
  }

  createForms() {
    this.productDetailsForm = this.fb.group({
      type: new FormControl(this.types[0], Validators.required),
      name: ['', Validators.required],
      price: new FormControl('', Validators.compose([
        Validators.pattern(/^[0-9]\d*$/),
        Validators.required
      ])),
      paymentType: new FormControl(this.paymentTypes[0], Validators.required),
      paymentBasis: new FormControl(this.paymentBases[0], Validators.required),
      description: ['', Validators.required],
      location: ['', Validators.required],
      status: new FormControl(this.statuses[0], Validators.required),
      delivery: ['', Validators.required]
    })
  }

  onSubmitProductDetails(value): void {

    this.httpClient.post(environment.endpointURL + 'user/register', {
      type: this.productDetailsForm.get('type').value,
      name: this.productDetailsForm.get('name').value,
      price: this.productDetailsForm.get('price').value,
      paymentType: this.productDetailsForm.get('paymentType').value,
      paymentBasis: this.productDetailsForm.get('paymentBasis').value,
      description: this.productDetailsForm.get('description').value,
      location: this.productDetailsForm.get('location').value,
      status: this.productDetailsForm.get('status').value,
      delivery: this.productDetailsForm.get('delivery').value,

    }).subscribe((res: any) => {
      //Add functionality for confirmation window
    });
  }
}
