import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  productId: number;
  product: Product;
  shipping: string;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private productService: ProductService) {
    
  }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.productService.getProductById(this.productId).subscribe(result => {
        this.product = result;
        if (this.product.delivery == true) {
          this.shipping = "Shipping possible"
        } else {
          this.shipping = "Shipping not possible"
        }
      });
    });
    
    
  }

}
