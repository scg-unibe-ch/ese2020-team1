import { FormControl } from '@angular/forms';

export class UsernameValidator {


  //Check with backend if username is taken already, to do
  static validUsername(fc: FormControl) {
    if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc") {
      return {
        validUsername: true
      };
    } else {
      return null;
    }
  }
}
