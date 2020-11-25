import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { LoggedInCheckerService } from '../../../auth/logged-in-checker.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  user: User;


  constructor(private loggedInCheckerService: LoggedInCheckerService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loggedInCheckerService.getUser().subscribe((found) => {
      this.user = found;
    });
  }


}
