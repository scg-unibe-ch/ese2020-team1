import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  private filterProducts(product: Product, price: number) { //function to test for each element
    return product.price <= price;
  }

  transform(products: Product[], price: number): Product[] {
    if (!products) { //if the product array is empty, return an empty array
      return [];
    } else if (!price) {
      return products;
    } else {
      return products.filter(it => {
        return this.filterProducts(it,price);
      });
    }


  }

}
