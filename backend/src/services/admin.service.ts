import { User, UserAttributes } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Product } from '../models/product.model';

export class AdminService {

    public register(admin: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        admin.isAdmin = true;
        admin.password = bcrypt.hashSync(admin.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(admin).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public deleteAdmin(id: string): Promise<number> {
        return User.findByPk(parseInt(id, 10))
            .then(found => {
                if (found != null) {
                    found.destroy();
                    return Promise.resolve(found.userId);
                } else {
                    return Promise.reject({ message: 'deletion failed' });
                }
            })
            .catch(err => Promise.reject({ message: err }));
    }

    public getAll(): Promise<User[]> {
        return User.findAll({
            where:
                { isAdmin: true }
        }).then(found => {
            return Promise.resolve(found);
        }).catch(err => {
            return Promise.reject({ message: err });
        });
    }

    public approveProduct(id: string): Promise<Product> {
        // Find a product by id and set the isApproved flag to approved
        return Product.findByPk(parseInt(id, 19))
            .then((product) => {
                product.update({ isApproved: 'approved' });
                return Promise.resolve(product);
            })
            .catch(err => Promise.reject({ message: err }));
    }
     public disapproveProduct(id: string): Promise<Product> {
         // Find a product by id and set the isApproved flag to disapproved
         return Product.findByPk(parseInt(id, 19))
             .then((product) => {
                 product.update({ isApproved: 'disapproved' });
                 return Promise.resolve(product);
             })
             .catch(err => Promise.reject({ message: err }));
     }
}
