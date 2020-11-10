import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  listOfProducts: Product[];

  constructor(private httpClient: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductList().subscribe((result) => this.listOfProducts = result);
  }
}

