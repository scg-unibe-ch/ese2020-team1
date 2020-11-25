import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  private filterProducts(product: Product, price: number, location: string) { //function to test for each element
    if (!!price && !!location) {
      return (product.price <= price && product.location === location);
    } else if (!price) {
      return (product.location === location);
    } else if (!location) {
      return (product.price <= price);
    }
    
  }

  transform(products: Product[], price: number, location: string): Product[] {
    if (!products) { //if the product array is empty, return an empty array
      return [];
    } else if (!price && !location) {
      return products;
    } else {
      return products.filter(it => {
        return this.filterProducts(it,price,location);
      });
    }


  }

}
