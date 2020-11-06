import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailCheckerService {

  constructor(private httpClient: HttpClient) { }

  validateEmail(email) {
    return this.httpClient.get(environment.endpointURL + 'user/is-email-free/' + email).pipe(res => res);
  };
}
