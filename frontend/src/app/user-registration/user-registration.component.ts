import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import {
  //Country,
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher,
} from '../validators';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {

  userDetailsForm: FormGroup;

  matching_passwords_group: FormGroup;
  //country_phone_group: FormGroup;
  result: Boolean;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = [
    "Male",
    "Female",
    "Other"
  ];



  validation_messages = {
    'firstName': [
      { type: 'required', message: 'First name is required' }
    ],
    'lastName': [
      { type: 'maxlength', message: 'Last name is required' },
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'birthday': [
      { type: 'required', message: 'Please insert your birthday' },
    ],
    'phone': [
      { type: 'required', message: 'Phone is required' },
      { type: 'minlength', message: 'Phone number must be at least 10 digits long' },     
      { type: 'pattern', message: 'Phone number can contain only digits and +' }
    ],
    'street': [
      { type: 'required', message: 'Street is required' }
    ],
    'zipCode': [
      { type: 'minlength', message: 'ZIP code must be at least 4 digits long' },
      { type: 'maxlength', message: 'ZIP code can be at most 5 digits long' },
      { type: 'pattern', message: 'ZIP code can contain digits only' },
      { type: 'min', message: 'ZIP code cannot start with 0' },
      { type: 'required', message: 'ZIP code is required'}
    ],
    'city': [
      { type: 'required', message: 'City is required'}
    ],
    'country': [
      {type: 'required', message: 'Country is required'}
    ],
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 7 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, one number and one special character' }
    ]
  }

  constructor(private fb: FormBuilder, private httpClient: HttpClient, public usernameValidator: UsernameValidator) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&+/|=~^£#<>-_:;.,/])[A-Za-z0-9@$!%*?&+"/|=~^£#<>-_:;.,"/]+$'),
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // user details form validations
    this.userDetailsForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.required
      ]),
        this.usernameValidator.checkUsername.bind(this.usernameValidator)
      ],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
      street: ['', Validators.required],
      zipCode: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(5),
        Validators.pattern(/^[0-9]\d*$/),
        Validators.min(1),
        Validators.required
      ])),
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[\+]?[0-9\s]*$/),
      ])),
      matching_passwords: this.matching_passwords_group,
    });


  }

  onSubmitUserDetails(value): void {
    console.log(this.userDetailsForm.get('username').value + this.matching_passwords_group.get('password').value);
    this.httpClient.post(environment.endpointURL + 'user/register', {
      userName: this.userDetailsForm.get('username').value,
      password: this.matching_passwords_group.get('password').value
    }).subscribe((res: any) => {
      // Set user data in local storage
      //localStorage.setItem('userToken', res.token);
      //localStorage.setItem('userName', res.user.userName);

      //this.checkUserStatus();
    });
  }


  validateUsername(username) {
    return this.httpClient.post(environment + 'user/isUsernameFree/', { username });

    };
  }

