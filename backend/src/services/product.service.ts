import { ProductAttributes, Product } from '../models/product.model';
import { User } from '../models/user.model';

const { Op } = require('sequelize');

export class ProductService {

    // public getById(productID: number): Promise<Product> {
    // return Product.findByPk(productId).
    public getById(id: string): Promise<Product> {
        return Product.findByPk(parseInt(id, 10))
            .then(found => {
                return Promise.resolve(found);
            })
            .catch(err => Promise.reject({ message: err }));
    }

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
        // return Product.findByPk(productId)
        // .then(found => found.destroy()
        // .then(() => Promise.resolve(found))
        // .catch(err => Promise.reject(err)));
        const product: Promise<Product> = Product.findOne({
            where: { productId: productId }
        });
        Product.destroy({
            where: { productId: productId }
        });
        return product;
    }

    public modify(productId: number, product: ProductAttributes): Promise<ProductAttributes> {
        return Product.findByPk(productId).then(found => found.update(product)
            .then(() => {
                return Promise.resolve(found);
            }).catch(err => Promise.reject(err)));
    }

    public getAll(): Promise<Product[]> {
        return Product.findAll()
            .catch(err => Promise.reject(err));
    }

    public getPending(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: 'pending'
            },
        }).catch(err => Promise.reject(err));
    }

    public getApproved(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: 'approved'
            },
        }).catch(err => Promise.reject(err));
    }

    public getDisapproved(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: 'disapproved'
            },
        }).catch(err => Promise.reject(err));
    }

     public getByUser(userName: string): Promise<Product[]> {
        return Product.findAll({
            where: {
                userName: userName
            },
     }).catch (err => Promise.reject(err));
     }

    // public getByCateogry(cateogry: string): Promise<Product[]> {
    //    return Product.findAll({
    //        where: {
    //            category: cateogry
    //        },
    // }).catch (err => Promise.reject(err));
    // }


}
