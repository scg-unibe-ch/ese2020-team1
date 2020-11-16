import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor(private httpClient: HttpClient) { }

  purchaseProduct(transaction: Transaction): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'purchase', transaction);
  }
}
