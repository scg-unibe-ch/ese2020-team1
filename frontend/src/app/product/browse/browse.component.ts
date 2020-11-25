import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  listOfProducts: Product[];
  searchString = '';


  //Filter configuration
  deliveryPossible = false;
  location = '';
  price = 0;
  maxPrice = 0;
  priceStep = 1;

  constructor(private httpClient: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductList().subscribe((result) => {
      this.listOfProducts = result;
      this.maxPrice = Math.max.apply(Math, this.listOfProducts.map(function(o) { return o.price })); //Get the maximum price of all the products
      
    });
  }

  onSearch(): void {
    console.log(this.searchString);
    this.productService.getProductListSearch(this.searchString).subscribe((result) => this.listOfProducts = result);
  }
}

