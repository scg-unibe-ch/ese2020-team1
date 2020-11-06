import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsernameCheckerService {

  constructor(private httpClient: HttpClient) { }

  validateUsername(username) {
    return this.httpClient.get(environment.endpointURL  + 'user/is-username-free/' + username).pipe(res => res);
  };
}
