import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../models/user.model';
import { LoggedInCheckerService } from '../../../../auth/logged-in-checker.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

    loginFailed: boolean;
    userName = '';
    userFirstName='';
    userLastName='';
    userEmail='';
    userBirthdate='';
    userStreet='';
    userZip='';
    userCity='';
    userPhone='';
    password = '';
    user: User;
  
    loggedIn = false;
  
    //data for showing the response
    secureEndpointResponse = '';
    checkStatus = '';
  
    constructor(private httpClient: HttpClient, private loggedInCheckerService: LoggedInCheckerService, private router: Router, private notificationService: NotificationService) { }
  
    ngOnInit(): void {
      this.loggedIn = this.loggedInCheckerService.checkUserStatus()
      this.loginFailed = false;
      if (this.loggedIn) {
          this.loggedInCheckerService.getUser().subscribe((found) => {
            this.user = found;
            this.userName = this.user.userName;
            this.userFirstName=this.user.firstName;
            this.userLastName= this.user.lastName;
            this.userBirthdate = new Date().toLocaleDateString();
          });
      }
    }
  
  
  
    login(): void {
      this.httpClient.post(environment.endpointURL + 'user/login', {
        userName: this.userName,
        password: this.password,
        userFirstName: this.user.firstName
      }).subscribe((res: any) => {
        // Set user data in local storage
        localStorage.setItem('userToken', res.token);
        localStorage.setItem('userName', res.user.userName);
        localStorage.setItem('userFirstName', res.user.firstName);
        localStorage.setItem('userLastName', res.user.lastName);
  
        this.user = res.user;
        this.loginFailed = false;
        this.loggedIn = this.loggedInCheckerService.isUserLoggedIn();
  
  
      }, (err) => this.loginFailed = true);
    }
    logout(): void {
      // Remove user data from local storage
      localStorage.removeItem('userToken');
      localStorage.removeItem('userName');
  
      this.loggedIn = this.loggedInCheckerService.isUserLoggedIn();
      this.loginFailed = false;
    }
  
    closeAlert() {
      this.loginFailed = false;
    }
}
