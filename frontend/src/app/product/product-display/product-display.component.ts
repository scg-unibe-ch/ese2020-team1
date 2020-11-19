import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  product: Product;
  shipping: string;

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    
    this.product = window.history.state;
    
    if(this.product.delivery == false){
      this.shipping = "Shipping not possible"
    }
    if(this.product.delivery == true){
      this.shipping = "Shipping possible"
    } else {
      this.shipping = "No info"
    }
  }

}
