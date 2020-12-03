
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken, verifyAdmin } from '../middlewares/checkAuth';
import { UserNotificationAttributes } from '../models/usernotification.model';
import { TransactionAttributes } from '../models/transaction.model';
import { read } from 'fs';
import { PurchaseRequestAttributes } from '../models/purchaserequest.model';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(403).send(err));
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(401).send(err));
    }
);

userController.get('/all', verifyToken, verifyAdmin, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(402).send(err));
    }
);

userController.get('/user', verifyToken, (req: Request, res: Response) => {
    userService.getUserById(req.body.tokenPayload.userId).then(found => res.send(found)).catch(err => res.status(402));
});


userController.delete('/:id', (req: Request, res: Response) => {
    userService.deleteUser(req.params.id).then(item => res.status(200).send({ deleted: item })).catch(err => res.status(403).send(err));

});

userController.get('/is-username-free/:username',
    (req: Request, res: Response) => {
        userService.isUsernameFree(req.params.username).then(free => res.send(free)).catch(err => res.status(400).send(err));
    }
);

userController.get('/is-email-free/:email',
    (req: Request, res: Response) => {
        userService.isEmailFree(req.params.email).then(free => res.send(free)).catch(err => res.status(400).send(err));
    }
);

userController.get('/notifications', verifyToken, (req: Request, res: Response) => {
    userService.getNotifications(req.body.tokenPayload.userId)
        .then((notifications: Array<UserNotificationAttributes>) => res.status(200).send(notifications))
        .catch(err => res.status(400).send(err));
});

userController.get('/requests', verifyToken,
    (req: Request, res: Response) => {
        userService.getRequests(req.body.tokenPayload.userId)
            .then((requests: Array<PurchaseRequestAttributes>) => res.status(200).send(requests))
            .catch(err => res.status(400).send(err));
    });

userController.get('/transactions/:id', verifyToken, (req: Request, res: Response) => {
    userService.getTransactions(req.params.id)
        .then((transaction: TransactionAttributes) => res.status(200).send(transaction))
        .catch(err => res.status(400).send(err));
});

userController.delete('/notification/:id', verifyToken, (req: Request, res: Response) => {
    userService.deleteNotification(req.params.id)
        .then(item => res.status(200).send({ deleted: item })).catch(err => res.status(403).send(err));
});

userController.delete('/request/:id', verifyToken, (req: Request, res: Response) => {
    userService.deleteRequest(req.params.id)
        .then(item => res.status(200).send({ deleted: item })).catch(err => res.status(403).send(err));
}
    );


export const UserController: Router = userController;
