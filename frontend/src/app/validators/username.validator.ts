import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor(public UserRegistrationComponent: UserRegistrationComponent) {

  }

  checkUsername(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        this.UserRegistrationComponent.validateUsername(control.value).subscribe((res) => {
          if (res) {
            resolve(null);
          }
        }, (err) => {
          resolve({ 'usernameInUse': true });
        });

      }, 1000);

    });
  }

}
