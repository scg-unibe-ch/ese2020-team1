import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { ParentErrorStateMatcher } from '../user-registration/validators';
@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent implements OnInit {

  productDetailsForm: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  alert: boolean = false;
  user: String;

  types = [
    "",
    "Product (sell)",
    "Product (lend)",
    "Service"
  ];


  paymentBases = [
    "",
    "Unique",
    "Hourly",
    "Daily"
  ];

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
      paymentBasis: new FormControl(this.paymentBases[0], Validators.required),
      description: new FormControl('', Validators.compose([
        Validators.maxLength(300),
        Validators.required
      ])),
      location: ['', Validators.required],
      delivery: new FormControl(false, Validators.nullValidator)
    })
  }

  onSubmitProductDetails(value): void {


    this.user = localStorage.getItem('userName');
    this.httpClient.post(environment.endpointURL + 'product/register', {
      userName: this.user,
      productType: this.productDetailsForm.get('type').value,
      title: this.productDetailsForm.get('name').value,
      price: this.productDetailsForm.get('price').value,
      payFreq: this.productDetailsForm.get('paymentBasis').value,
      description: this.productDetailsForm.get('description').value,
      location: this.productDetailsForm.get('location').value,
      status: "availabe",
      delivery: this.productDetailsForm.get('delivery').value,

    }).subscribe((res: any) => {
      this.alert = true;
      this.productDetailsForm.reset({});
    });
  }
  closeAlert() {
    this.alert = false;
  }
}
