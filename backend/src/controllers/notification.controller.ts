
import express, { Router, Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { verifyToken } from '../middlewares/checkAuth';
import { UserNotificationAttributes } from '../models/usernotification.model';
import { TransactionAttributes } from '../models/transaction.model';
import { PurchaseRequestAttributes } from '../models/purchaserequest.model';

const notificationController: Router = express.Router();
const notificationService = new NotificationService();



notificationController.get('/notifications', verifyToken, (req: Request, res: Response) => {
    notificationService.getNotifications(req.body.tokenPayload.userId)
        .then((notifications: Array<UserNotificationAttributes>) => res.status(200).send(notifications))
        .catch(err => res.status(400).send(err));
});

notificationController.get('/requests', verifyToken,
    (req: Request, res: Response) => {
        notificationService.getRequests(req.body.tokenPayload.userId)
            .then((requests: Array<PurchaseRequestAttributes>) => res.status(200).send(requests))
            .catch(err => res.status(400).send(err));
    });

notificationController.get('/transaction/:id', verifyToken, (req: Request, res: Response) => {
    notificationService.getTransactions(req.params.id)
        .then((transaction: TransactionAttributes) => res.status(200).send(transaction))
        .catch(err => res.status(400).send(err));
});

notificationController.delete('/notification/:id', verifyToken, (req: Request, res: Response) => {
    notificationService.deleteNotification(req.params.id)
        .then(item => res.status(200).send({ deleted: item }))
        .catch(err => res.status(400).send(err));
});

notificationController.delete('/request/:id', verifyToken, (req: Request, res: Response) => {
    notificationService.deleteRequest(req.params.id)
        .then(item => res.status(200).send({ deleted: item }))
        .catch(err => res.status(400).send(err));
});

notificationController.get('/transactions-buyer', verifyToken,
    (req: Request, res: Response) => {
        notificationService.getTransactionsBuyer(req.body.tokenPayload.userId)
            .then((transactions: Array<TransactionAttributes>) => res.status(200).send(transactions))
            .catch(err => res.status(400).send(err));
    });

notificationController.get('/transactions-seller', verifyToken,
    (req: Request, res: Response) => {
        notificationService.getTransactionsSeller(req.body.tokenPayload.userId)
            .then((transactions: Array<TransactionAttributes>) => res.status(200).send(transactions))
            .catch(err => res.status(400).send(err));
    });


export const NotificationController: Router = notificationController;
