import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { Transaction } from '../../../models/transaction.model';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {

  constructor(private notificationService: NotificationService) {}

  bought: Transaction[];
  sold: Transaction[];

  ngOnInit(): void {
    this.notificationService.getTransactionsBuyer().subscribe(result => this.bought = result);
    this.notificationService.getTransactionsSeller().subscribe(result => this.sold = result);
  }

}
