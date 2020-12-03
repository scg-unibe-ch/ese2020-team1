import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { ProductService } from '../../../product/product.service';
import { PurchaseRequest } from '../../../models/purchaserequest.model';

@Component({
  selector: 'app-purchase-requests',
  templateUrl: './purchase-requests.component.html',
  styleUrls: ['./purchase-requests.component.css']
})
export class PurchaseRequestsComponent implements OnInit {



  constructor(private notificationService: NotificationService, private productService: ProductService) { }

  requests: PurchaseRequest[];


  ngOnInit(): void {
    //Check for notifications
    this.notificationService.getRequests().subscribe((result) => {
      this.requests = result;
      for (let request of this.requests) {
        this.notificationService.getTransactions(request.transactionId).subscribe((result) => {
          request.transaction = result;
        })
      }
    });
  }

  onDeleteRequest(request: PurchaseRequest): void {
    this.notificationService.deleteRequest(request.requestId).subscribe(() => {
      this.requests.splice(this.requests.indexOf(request), 1);
    })
  }

  onConfirmRequest(request: PurchaseRequest): void {
    this.notificationService.confirmRequest(request.transactionId).subscribe(() => {
      this.onDeleteRequest(request);
    })
  }


}
