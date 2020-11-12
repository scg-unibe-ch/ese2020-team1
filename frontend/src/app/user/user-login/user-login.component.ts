import { Component, Directive, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {User} from '../../models/user.model';

import { LoggedInCheckerService } from '../../auth/logged-in-checker.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})


export class UserLoginComponent implements OnInit {

  userName = '';
  password = '';
  user: User;

  loggedIn = false;

  //data for showing the response
  secureEndpointResponse = '';
  checkStatus = '';

  constructor(private httpClient: HttpClient, private loggedInCheckerService: LoggedInCheckerService, private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = this.loggedInCheckerService.checkUserStatus()
    if (this.loggedIn) {
        this.loggedInCheckerService.getUser().subscribe((found) => {
          this.user = found;
          this.userName = this.user.userName;
        });
    }
  }



  login(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);

      this.user = res.user;
      this.userName = this.user.userName;

      this.loggedIn = true;

    });
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.loggedIn = false;
  }


  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
    }, (error: any) => {
      this.secureEndpointResponse = 'Unauthorized';
    });
  }
}
