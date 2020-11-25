import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ParentErrorStateMatcher } from '../../user/user-registration/validators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BrowseComponent } from '../browse/browse.component';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent implements OnInit {

  //Create product registration form
  productDetailsForm: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  //For notifying the user if the registration was successful
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

 constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) { }

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


    this.httpClient.post(environment.endpointURL + 'product/add', {
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
      this.productDetailsForm.disable();
    });
    setTimeout(() => {
      this.router.navigateByUrl("/");
    }, 5000);
  }
  closeAlert() {
    this.alert = false;
  }
}
