import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  listOfProducts: { string: Product[] };

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.httpClient.get(environment.endpointURL + 'product/all').subscribe((item: any) => {
      console.log(item);
      //parse the json answer to listOfProducts
    });
  }
}
