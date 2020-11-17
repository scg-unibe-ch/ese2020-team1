import { Component, OnInit, Input } from '@angular/core';
import { UserNotification } from '../../../../models/usernotification.model';
import { NotificationService } from '../../notification.service';
import { Transaction } from '../../../../models/transaction.model';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.css']
})
export class UserNotificationsComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  notifications: UserNotification[];

  transactions: Transaction[] = [];

  ngOnInit(): void {
    //Check for notifications
    this.notificationService.getNotifications().subscribe((result) => {
      this.notifications = result;
      for (let notification of this.notifications) {
        this.notificationService.getTransactions(notification.transactionId).subscribe((result) => {
          this.transactions.push(result);
        })
      }
    });
  }

}
