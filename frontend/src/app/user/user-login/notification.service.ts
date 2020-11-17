import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  getTransactions(notificationId: number): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'user/transactions/' + notificationId);
  }

  constructor(private httpClient: HttpClient) { }

  public getNotifications(): Observable<any>{
    return this.httpClient.get(environment.endpointURL + 'user/notifications');
  }
}
