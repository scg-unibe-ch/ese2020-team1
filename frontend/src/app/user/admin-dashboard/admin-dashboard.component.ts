import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  listOfProducts: Product[];
  panelOpenState = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.updateProductList();
  }

  updateProductList(): void {
    this.productService.getPendingProducts().subscribe((result) => this.listOfProducts = result);
  }

  onApproveProduct(id: number): void {
    this.productService.approveProduct(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  onDisapproveProduct(id: number): void {
    this.productService.disapproveProduct(id).subscribe(() => {
      this.ngOnInit();
    })
  }


}
