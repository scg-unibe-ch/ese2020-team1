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
    if (this.LoggedInCheckerService.isUserLoggedIn) { return true; }

    this.LoggedInCheckerService.redirectUrl = url;
    return this.router.parseUrl('/user-login');
  }

  
}
