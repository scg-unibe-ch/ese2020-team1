import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LoggedInCheckerService } from './logged-in-checker.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private LoggedInCheckerService: LoggedInCheckerService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }


  checkLogin(url: string): true | UrlTree {
    //Return true if a user is logged in -> navigation continues
    if (this.LoggedInCheckerService.isUserLoggedIn()) {
      return true;
    }

    //If no user logged in, navigation is cancelled
    //Store the value of the current route in LoggedInCheckerService to access it after login (user-login needs to be updated)
    this.LoggedInCheckerService.redirectUrl = url;

    //Return the url to the user login page
    return this.router.parseUrl('/user/user-login');
  }

  
}
