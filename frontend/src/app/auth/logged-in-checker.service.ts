import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggedInCheckerService {

  constructor(private httpClient: HttpClient) { }

  loggedIn = false;
  redirectUrl = '/';

  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.loggedIn = true;
    }, (error: any) => {
        this.loggedIn = false;
    });
  }

  isUserLoggedIn(): boolean {
    this.accessSecuredEndpoint();
    return this.loggedIn;
  }
}
