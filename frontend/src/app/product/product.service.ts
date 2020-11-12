import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'product/approved');
  }

  getProductById(id: number): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'product/by-product/' + id);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(environment.endpointURL + 'product/delete/' + id);
  }

  getProductByUser(): Observable<any>{
    return this.httpClient.get(environment.endpointURL+  'product/by-user');
  }

  getPendingProducts(): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'product/pending');
  }

  approveProduct(id: number): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'admin/approve-product/' + id);
  }

  disapproveProduct(id: number): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'admin/disapprove-product/' + id);
  }
}
