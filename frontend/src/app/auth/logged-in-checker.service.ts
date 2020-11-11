import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggedInCheckerService {


  userToken: string;
  loggedIn = false;

  //Path to which a user gets redirected after login (user-login needs to be updated)
  redirectUrl = '/';

  constructor(private httpClient: HttpClient) { }



  //Promise to check if user is logged in (access secured endpoint)
  //Resolve with "true"
  checkUserStatus(): boolean {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
    return this.loggedIn;
  }

  //returns true if a user is logged in
  //returns false if no user is logged in
  isUserLoggedIn(): boolean {
    return this.checkUserStatus();
  }

}
