import { FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

export class UsernameValidator {

  //Check with backend if username is taken already, to do
  static validUsername(fc: FormControl) {
    this.httpClient.post(environment.endpointURL + 'user/isUsernameFree', { fc.value });
    return null;  
  }
}
