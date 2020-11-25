import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { LoggedInCheckerService } from '../../auth/logged-in-checker.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isAdmin: boolean = false;

  @Input()
  user: User;


  constructor(private loggedInCheckerService: LoggedInCheckerService, private activeRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {


    this.loggedInCheckerService.getUser().subscribe(user => {
      this.user = user;
      this.isAdmin = this.user.isAdmin;
    })
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.router.navigateByUrl('/user/user-login');
  }

}
