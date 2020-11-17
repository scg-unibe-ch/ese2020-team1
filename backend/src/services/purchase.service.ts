import { UserAttributes, User } from '../models/user.model';
import { ProductAttributes, Product } from '../models/product.model';
import { TransactionAttributes, Transaction } from '../models/transaction.model';
import { TodoItem } from '../models/todoitem.model';


export class PurchaseService {

    public purchase(transaction: TransactionAttributes, buyerId: number): Promise<TransactionAttributes> {

        transaction.buyerId = buyerId; // Store the buyerId from extracted from the token


        return this.createTransaction(transaction).then(created => {

            return Promise.resolve(created);
            // this.getWalletId(transaction.buyerId).then(buyerWalletId => {
            //    this.getWalletId(transaction.sellerId).then(sellerWalletId => {
            //        this.updateWallets(buyerWalletId, sellerWalletId, transaction.totalPrice);
            //    });
            // });
        });


    }

    private createTransaction(transaction: TransactionAttributes): Promise<TransactionAttributes> {
        return Transaction.create(transaction).then((created) => {
            return Promise.resolve(created);
        })
            .catch(err => Promise.reject(err));
    }

    private getWalletId(userId: number): Promise<number> {
        // Todo
        return User.findByPk(userId).then(found => {
            return Promise.resolve(found.walletId);
        }).catch(err => Promise.reject(err));
    }

    private updateWallets(buyerWalletId: number, sellerWalletId: number, amount: number): Promise<void> {
        // Todo
        return Promise.resolve();
    }
}
