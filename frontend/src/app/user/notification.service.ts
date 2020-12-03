import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  

  constructor(private httpClient: HttpClient) { }

  public getNotifications(): Observable<any>{
    return this.httpClient.get(environment.endpointURL + 'notification/notifications');
  }

  public deleteNotification(notificationId: number): Observable<any> {
    return this.httpClient.delete(environment.endpointURL + 'notification/notification/' + notificationId);
  }

  getTransactions(notificationId: number): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'notification/transactions/' + notificationId);
  }


  confirmRequest(transactionId: number): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'purchase/confirm/' + transactionId)
  }

  deleteRequest(requestId: number): Observable<any> {
    return this.httpClient.delete(environment.endpointURL + 'notification/request/' + requestId);
  }
  getRequests(): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'notification/requests');
  }


}
