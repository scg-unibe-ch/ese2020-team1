import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { ProductService } from '../../product/product.service';
import { User } from '../../models/user.model';
import { LoggedInCheckerService } from '../../auth/logged-in-checker.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isAdmin: boolean = false;

  @Input()
  user: User;

  constructor(private loggedInCheckerService: LoggedInCheckerService) {

  }

  ngOnInit(): void {

    this.loggedInCheckerService.isAdmin().subscribe(item => {
      this.isAdmin = item.message;
    })
    this.isAdmin = this.user.isAdmin;
  }

}
