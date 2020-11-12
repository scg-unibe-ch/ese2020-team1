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

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    
    this.product = window.history.state;
  }

}
