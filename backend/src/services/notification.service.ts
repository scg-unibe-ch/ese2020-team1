import { UserNotification } from '../models/usernotification.model';
import { Transaction } from '../models/transaction.model';
import { PurchaseRequest } from '../models/purchaserequest.model';


export class NotificationService {
    deleteRequest(id: string) {
        return PurchaseRequest.findByPk(parseInt(id, 10))
            .then(found => {
                if (found != null) {
                    found.destroy();
                    return Promise.resolve(found);
                } else {
                    return Promise.reject({ message: 'deletion failed' });
                }
            })
            .catch(err => Promise.reject({ message: err }));
    }

    public deleteNotification(id: string) {
        return UserNotification.findByPk(parseInt(id, 10))
            .then(found => {
                if (found != null) {
                    found.destroy();
                    return Promise.resolve(found);
                } else {
                    return Promise.reject({ message: 'deletion failed' });
                }
            })
            .catch(err => Promise.reject({ message: err }));
    }
    public getNotifications(userId: number): Promise<UserNotification[]> {
        return UserNotification.findAll({
            where: {
                sellerId: userId
            }
        }).then(found => Promise.resolve(found))
            .catch(err => Promise.reject(err));
    }


    public getRequests(userId: number): Promise<PurchaseRequest[]> {
        return PurchaseRequest.findAll({
            where: {
                sellerId: userId
            }
        }).then(found => Promise.resolve(found))
            .catch(err => Promise.reject(err));
    }

    public getTransactions(transactionId: string): Promise<Transaction> {
        return Transaction.findByPk(parseInt(transactionId, 10))
            .then(found => Promise.resolve(found))
            .catch(err => Promise.reject(err));
    }

    public getTransactionsBuyer(id: number): Promise<Transaction[]> {
        console.log('get transactions buyer called');
        return Transaction.findAll({
            where: {
                buyerId: id
            }
        }).then(found => Promise.resolve(found))
            .catch((err) => Promise.reject(err));
    }

    public getTransactionsSeller(id: number): Promise<Transaction[]> {
        console.log('get transactions seller called');
        return Transaction.findAll({
            where: {
                sellerId: id
            }
        }).then(found => Promise.resolve(found))
            .catch((err) => Promise.reject(err));
    }
}
