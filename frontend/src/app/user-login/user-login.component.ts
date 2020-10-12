import { Component, Directive, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsernameValidator } from '../validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})


export class UserLoginComponent implements OnInit {

  userName = '';
  password = '';
  checkStatus = false;

  userToken: string;
  loggedIn = false;

  secureEndpointResponse = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  login(): void {
    //If the username is valid we can continue to the login form
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);

      this.checkUserStatus();
    });
  }
  // Function for checking in the login page if the UserName is valid
  validateUserName(): void{
    this.httpClient.get(environment.endpointURL + 'user/isUsernameFree'); //we have function for checking if username is free but we need to use it here
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.checkUserStatus();
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
