import { ProductAttributes, Product } from '../models/product.model';
import { User } from '../models/user.model';

export class ProductService {

    public create(product: ProductAttributes): Promise<ProductAttributes> {
        // User.findOne({
        //    where: {
        //        userName: product.userName
        //    }
        // }).then(user => product.userId = user.userId);

        return Product.create(product)
            .then(inserted => Promise.resolve(inserted))
            .catch(err => Promise.reject(err));
    }

    public delete(productId: number): Promise<Product> {

        const product: Promise<Product> = Product.findOne({
            where: { productId: productId }
        });
        Product.destroy({
            where: { productId: productId }
        });
        return product;
    }

    public modify(product: ProductAttributes): Promise<ProductAttributes> {
        // TODO
        return;
    }

    public getAll(): Promise<Product[]> {
        return Product.findAll();
    }

}
