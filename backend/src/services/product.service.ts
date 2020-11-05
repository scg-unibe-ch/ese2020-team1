import { ProductAttributes, Product } from '../models/product.model';

export class ProductService {

    public create(product: ProductAttributes): Promise<ProductAttributes> {
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
