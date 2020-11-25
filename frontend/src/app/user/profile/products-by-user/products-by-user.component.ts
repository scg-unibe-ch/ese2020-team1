import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../product/product.service';

@Component({
  selector: 'app-products-by-user',
  templateUrl: './products-by-user.component.html',
  styleUrls: ['./products-by-user.component.css']
})
export class ProductsByUserComponent implements OnInit {

  listOfProducts:Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductByUser().subscribe((result) => this.listOfProducts = result);

  }

}
