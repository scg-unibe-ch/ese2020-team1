import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';
import { Comment } from '../../models/comment.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  productId: number;
  product: Product;
  shipping: string;
  listOfComments: Comment[];
  comment: string;

  commentAdditionForm: FormGroup;

  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    ) {}

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.productService.getProductById(this.productId).subscribe(result => {
        this.product = result;
        //this.productService.getCommentById(this.productId).subscribe((result)=>this.listOfComments=result)
        if (this.product.delivery == true) {
          this.shipping = "Shipping possible"
        } else {
          this.shipping = "Shipping not possible"
        }
        //this.listOfComments = this.productService.getComments()
      });
    }); 
  }

  onSubmitCommentDetails(value): void{
    this.httpClient.put(environment.endpointURL + 'comment/addComment' + this.product.productId, {
      comment: this.commentAdditionForm.get('comment').value
    } ).subscribe((res: any)=> {
      this.comment = res;
    });
  }
}
