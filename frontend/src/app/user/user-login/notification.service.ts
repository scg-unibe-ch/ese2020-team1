import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNotification } from '../../models/usernotification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  

  constructor(private httpClient: HttpClient) { }

  public getNotifications(): Observable<any>{
    return this.httpClient.get(environment.endpointURL + 'user/notifications');
  }

  public deleteNotification(notificationId: number): Observable<any> {
    return this.httpClient.delete(environment.endpointURL + 'user/notification/' + notificationId);
  }

  getTransactions(notificationId: number): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'user/transactions/' + notificationId);
  }

}
