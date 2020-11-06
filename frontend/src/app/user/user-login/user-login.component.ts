import { Component, Directive, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { LoggedInCheckerService } from '../../auth/logged-in-checker.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})


export class UserLoginComponent implements OnInit {

  userName = '';
  password = '';

  userToken: string;
  loggedIn = false;

  //data for showing the response
  secureEndpointResponse = '';
  checkStatus = '';

  constructor(private httpClient: HttpClient, public LoggedInCheckerService: LoggedInCheckerService, private router: Router) { }

  ngOnInit(): void {
    this.LoggedInCheckerService.checkUserStatus();
  }


  login(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);

      this.LoggedInCheckerService.checkUserStatus();
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 2000);
    });


  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.LoggedInCheckerService.checkUserStatus();
  }


  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  //accessSecuredEndpoint(): void {
  //  this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
  //    this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
  //  }, (error: any) => {
  //    this.secureEndpointResponse = 'Unauthorized';
  //  });
  //}
}
