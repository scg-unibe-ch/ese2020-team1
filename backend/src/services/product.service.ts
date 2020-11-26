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

    public create(product: ProductAttributes, id: number, name: string): Promise<ProductAttributes> {

        product.userId = id;
        product.userName = name;

        return Product.create(product)
            .then(inserted => Promise.resolve(inserted))
            .catch(err => Promise.reject(err));
    }

    public delete(productId: number): Promise<Product> {
         return Product.findByPk(productId)
         .then(found => found.destroy()
         .then(() => Promise.resolve(found))
         .catch(err => Promise.reject(err)));
        // const product: Promise<Product> = Product.findOne({
        //    where: { productId: productId }
        // });
        // Product.destroy({
        //    where: { productId: productId }
        // });
        // return product;
    }

    public modify(productId: number, product: ProductAttributes): Promise<ProductAttributes> {
        return Product.findByPk(productId).then(found => found.update(product)
            .then(() => {
                return Promise.resolve(found);
            }).catch(err => Promise.reject(err)));
    }

    public getAll(): Promise<Product[]> {
        return Product.findAll().then(found => Promise.resolve(found)).catch(err => Promise.reject(err));
    }

    public getPending(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: 'pending'
            },
        }).then(found => Promise.resolve(found)).catch(err => Promise.reject(err));
    }

    public getApproved(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: 'approved'
            },
        }).then(found => Promise.resolve(found))
            .catch(err => Promise.reject(err));
    }

    public getApprovedSearch(searchString: string): Promise<Product[]> {
        return Product.findAll({
            where: {
                [Op.and]: [
                    { isApproved : 'approved' },
                    {
                        [Op.or]: [
                            { title: { [Op.like]: '%' + searchString + '%' } },
                            { description: { [Op.like]: '%' + searchString + '%' } }
                        ]
                    }
                ]
            },
        }).then(found => Promise.resolve(found))
            .catch(err => Promise.reject(err));
    }

    public getDisapproved(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: 'disapproved'
            },
        }).then(found => Promise.resolve(found)).catch(err => Promise.reject(err));
    }

     public getByUser(userId: string): Promise<Product[]> {
         return Product.findAll({
             where: {
                 userId: parseInt(userId, 10)
             },
         }).then(found => Promise.resolve(found))
            .catch(err => Promise.reject(err));
     }

    // public getByCateogry(cateogry: string): Promise<Product[]> {
    //    return Product.findAll({
    //        where: {
    //            category: cateogry
    //        },
    // }).catch (err => Promise.reject(err));
    // }


}
