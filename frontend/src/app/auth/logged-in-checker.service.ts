import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInCheckerService {


  userToken: string;
  //Subject can be subscribed by other components, e.g. the navbar in order to automatically check if a user is logged in
  loggedIn = new Subject<boolean>();
  user: User;

  //Path to which a user gets redirected after login (user-login needs to be updated)
  redirectUrl = '/';

  constructor(private httpClient: HttpClient) { }



  //Promise to check if user is logged in (access secured endpoint)
  //Resolve with "true"
  checkUserStatus(): boolean {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');

    // Set boolean whether a user is logged in or not
    this.loggedIn.next(!!this.userToken);
    return !!this.userToken;
  }

  getUser(): Observable<any>{
    return this.httpClient.get(environment.endpointURL + 'user/user');
  }

  //returns true if a user is logged in
  //returns false if no user is logged in
  isUserLoggedIn(): boolean {
    return this.checkUserStatus();
  }

  isAdmin(): Observable<any> {
    return this.httpClient.get(environment.endpointURL + "admin/verify-admin");
  }

}
