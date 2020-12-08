import { UserAttributes, User } from '../models/user.model';
import { ProductAttributes, Product } from '../models/product.model';
import { TransactionAttributes, Transaction } from '../models/transaction.model';
import { UserNotificationAttributes, UserNotification } from '../models/usernotification.model';
import { PurchaseRequest, PurchaseRequestAttributes } from '../models/purchaserequest.model';


export class PurchaseService {

    public purchase(transaction: TransactionAttributes, buyerId: number): Promise<void> {

        transaction.buyerId = buyerId; // Store the buyerId from extracted from the token


        return this.createTransaction(transaction)
            .then((created) => {
                transaction = created;

                if (transaction.confirmed) {
                    return this.createNotification(created.transactionId, created.sellerId);
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => {
                if (transaction.confirmed) {
                    return this.updateWallet(transaction.sellerId, +transaction.totalPrice);
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => {
                if (transaction.confirmed) {
                    return this.updateWallet(transaction.buyerId, -transaction.totalPrice);
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => this.updateProductStatus(transaction.productId))
            .then(() => {
                if (!transaction.confirmed) {
                    return this.createPurchaseRequest(transaction);
                    console.log('purchase request created');
                } else {
                    return Promise.resolve();
                }
            })
            .catch(err => Promise.reject(err));

    }
    private createPurchaseRequest(transaction: TransactionAttributes): Promise<void> {
        return PurchaseRequest.create({transactionId: transaction.transactionId, sellerId: transaction.sellerId})
            .then(() => Promise.resolve())
            .catch(() => Promise.reject());
    }

    private createTransaction(transaction: TransactionAttributes): Promise<TransactionAttributes> {
        return Transaction.create(transaction)
            .then((created) => Promise.resolve(created))
            .catch(err => Promise.reject(err));
    }

    private createNotification(transId: number, userId: number): Promise<void> {

        return UserNotification.create({
            transactionId: transId,
            sellerId: userId

        }).then(() => Promise.resolve())
            .catch(err => Promise.reject(err));
    }

    private updateWallet(userId: number, amount: number): Promise<void> {
        // Update the sellers wallet
        return User.findByPk(userId).then((found) => {
            return found.update({
                wallet: found.wallet + amount // The saldo is checked in the frontend
            }).then((updated) => Promise.resolve());
        }).then(promise => promise)
            .catch(err => Promise.reject(err));
    }

    private updateProductStatus(productId: number): Promise<void> {
        return Product.findByPk(productId).then((found) => {
            if (found.productType.valueOf() === 'Product (sell)') {
                return found.update({
                    isApproved: 'sold'
                }).then(() => Promise.resolve());
            } else { return Promise.resolve(); }
        })
            .catch(err => Promise.reject(err));
    }

    public confirmTransaction(transactionId: number): Promise<void> {
        return Transaction.findByPk(transactionId).then(found => {
            return found.update({
                confirmed: true
            })
            .then(() => Promise.resolve())
            .then(() => this.createNotification(found.transactionId, found.sellerId))
            .then(() => this.updateWallet(found.sellerId, +found.totalPrice))
            .then(() => this.updateWallet(found.buyerId, -found.totalPrice));
        }).catch(err => Promise.reject(err));

    }
}
