import { UserAttributes, User } from '../models/user.model';
import { ProductAttributes, Product } from '../models/product.model';
import { TransactionAttributes, Transaction } from '../models/transaction.model';
import { TodoItem } from '../models/todoitem.model';
import { UserNotificationAttributes, UserNotification } from '../models/usernotification.model';


export class PurchaseService {

    public purchase(transaction: TransactionAttributes, buyerId: number): Promise<void> {

        transaction.buyerId = buyerId; // Store the buyerId from extracted from the token


        return this.createTransaction(transaction)
            .then(created => {
                return this.createNotification(created.transactionId, created.sellerId);
            })
            .then(() => {
                return this.updateWallet(transaction.sellerId, +transaction.totalPrice);
            })
            .then(() => {
                return this.updateWallet(transaction.buyerId, -transaction.totalPrice);
            })
            .then(() => {
                return this.updateProductStatus(transaction.productId);
            })
            .catch(err => Promise.reject(err));

    }

    private createTransaction(transaction: TransactionAttributes): Promise<TransactionAttributes> {
        return Transaction.create(transaction).then((created) => {
            return Promise.resolve(created);
        })
            .catch(err => Promise.reject(err));
    }

    private createNotification(transId: number, userId: number): Promise<void> {

        return UserNotification.create({
            transactionId: transId,
            sellerId: userId

        }).then(() => Promise.resolve()).catch(err => Promise.reject(err));
    }

    private updateWallet(userId: number, amount: number): Promise<void> {
        // Update the sellers wallet
        return User.findByPk(userId).then((found) => {
            return found.update({
                wallet: found.wallet + amount // The saldo is checked in the frontend
            }).then((updated) => {
                return Promise.resolve();
            });
        }).then(promise => {
            return promise;
        });
    }

    private updateProductStatus(productId: number): Promise<void> {
        return Product.findByPk(productId).then((found) => {
            return found.update({
                isApproved: 'sold'
            }).then(() => {
                return Promise.resolve();
            });
        });
    }
}
