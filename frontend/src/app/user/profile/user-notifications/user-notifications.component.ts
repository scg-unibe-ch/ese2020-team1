import { Component, OnInit, Input } from '@angular/core';
import { UserNotification } from '../../../models/usernotification.model';
import { NotificationService } from '../../notification.service';
import { Transaction } from '../../../models/transaction.model';
import { ProductService } from '../../../product/product.service';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.css']
})
export class UserNotificationsComponent implements OnInit {

  constructor(private notificationService: NotificationService, private productService: ProductService) { }

  notifications: UserNotification[];

  transactions: Transaction[] = [];

  ngOnInit(): void {
    //Check for notifications
    this.notificationService.getNotifications().subscribe((result) => {
      this.notifications = result;
      for (let notification of this.notifications) {
        this.notificationService.getTransactions(notification.transactionId).subscribe((result) => {
          notification.transaction = result;
        })
      }
    });
  }

  onDeleteNotification(notification: UserNotification): void {
    this.notificationService.deleteNotification(notification.notificationId).subscribe(() => {
      this.notifications.splice(this.notifications.indexOf(notification),1);
    })
  }

}
