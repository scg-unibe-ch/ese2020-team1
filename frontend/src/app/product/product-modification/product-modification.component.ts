import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ParentErrorStateMatcher } from '../../user/user-registration/validators';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-modification',
  templateUrl: './product-modification.component.html',
  styleUrls: ['./product-modification.component.css']
})
export class ProductModificationComponent implements OnInit {

  //
  modificationEnabled: boolean = false;
  //The product id will be passed from the parent component

  product: Product;
  productId: number;


  //Create product modification form
  productModificationForm: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  //For notifying the user if the modification was successful
  alertModify: boolean = false;
  alertDelete: boolean = false;

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

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private productService: ProductService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //Store the product
    this.activeRoute.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.productService.getProductById(this.productId).subscribe(result => {
        this.product = result;
        
        this.createForms();
      });
    });
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

    this.productModificationForm.disable();
    this.productModificationForm.get('delivery').disable();
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
      isApproved: "pending"

    }).subscribe((res: any) => {
      this.alertModify = true;
      this.product = res;
      this.modificationEnabled = false;
      this.productModificationForm.disable();
    });
  }

  onDeleteProduct(): void {
    this.productService.deleteProduct(this.product.productId).subscribe(message => {
      if (message === null) {
        //Represent notification upon successful deletion
        this.alertDelete = true;
        this.modificationEnabled = false;
        //Return to browse page
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 2000);
      }
    });

  }

  onModifyProduct(): void {
    this.productModificationForm.enable();
    this.modificationEnabled = true;
  }


  closeAlert() {
    this.alertModify = false;
    this.alertDelete = false;
  }



}
