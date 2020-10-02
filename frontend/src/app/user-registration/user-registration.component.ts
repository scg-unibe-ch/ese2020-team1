import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {


  userName = '';
  email = '';
  firstName = '';
  lastName = '';
  password = '';
  passwordStrength = 0;


  userToken: string;



  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {  }


  register(): void {
    this.httpClient.post(environment.endpointURL + 'user/register', {
      userName: this.userName,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
    });
  }

  onStrengthChanged(strength: number) {
    this.passwordStrength = strength;
  }
}
