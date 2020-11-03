import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsernameCheckerService } from './username-checker.service';
import { EmailCheckerService } from './email-checker.service';

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor(private UsernameCheckerService: UsernameCheckerService, private EmailCheckerService: EmailCheckerService) {

  }

  checkUsername(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        this.UsernameCheckerService.validateUsername(control.value).subscribe((res) => {
          if (res) {
            resolve(null);
          } else if (!res) {
            resolve({ 'usernameInUse': true });
          }
        }, (err) => {
          resolve({ 'usernameInUse': true });
        });

      }, 1000);

    });
  }

  checkEmail(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        this.EmailCheckerService.validateEmail(control.value).subscribe((res) => {
          if (res) {
            resolve(null);
          } else if (!res) {
            resolve({ 'emailInUse': true });
          }
        }, (err) => {
          resolve({ 'emailInUse': true });
        });

      }, 1000);

    });
  }

}
