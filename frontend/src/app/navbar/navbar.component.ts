import { Component, OnInit } from '@angular/core';

import { LoggedInCheckerService } from '../auth/logged-in-checker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private loggedInCheckerService: LoggedInCheckerService, private router: Router) {

    this.loggedInCheckerService.loggedIn.subscribe(value => {
      this.loggedIn = value;
    });
  }

  ngOnInit(): void {
    this.loggedInCheckerService.loggedIn.subscribe(value => {
      this.loggedIn = value;
    })
  }

}

