import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  private filterProducts(product: Product, price: number, location: string, deliveryPossible: boolean) { //function to test for each element
    
     return (this.filterByPrice(product, price) && this.filterByLocation(product,location) && this.filterByDelivery(product,deliveryPossible));
  }

  private filterByPrice(product: Product, price: number) {

    if (!price) { //If no value is set for price, then return true in any case
      return true;
    } else {
      return product.price <= price;
    }
    
  }

  private filterByLocation(product: Product, location: string) {
    if (!location) {//If no location is specified, return true in any case
      return true;
    } else {
      return (product.location.toLowerCase() === location.toLowerCase());
    }
  }

  private filterByDelivery(product: Product, deliveryPossible: boolean) {

    if (!deliveryPossible) { //If delivery is not necessary, return true in any case
      return true;
    } else {
      return product.delivery;
    }
    
  }

  transform(products: Product[], price: number, location: string, deliveryPossible: boolean): Product[] {
    if (!products) { //if the product array is empty, return an empty array
      return [];
    } else if (!price && !location && !deliveryPossible) {
      return products;
    } else {
      return products.filter(it => {
        return this.filterProducts(it,price,location,deliveryPossible);
      });
    }


  }

}
