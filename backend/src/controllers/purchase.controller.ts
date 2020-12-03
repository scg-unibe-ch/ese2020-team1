import express, { Router, Request, Response } from 'express';

import { verifyToken, verifyAdmin } from '../middlewares/checkAuth';
import { PurchaseService } from '../services/purchase.service';
import { Transaction } from '../models/transaction.model';

const purchaseService = new PurchaseService();
const purchaseController: Router = express.Router();

purchaseController.post('/', verifyToken, // purchase can only be called by logged in users, id is extracted from token
    (req: Request, res: Response) => {
        purchaseService.purchase(req.body, req.body.tokenPayload.userId).then(purchased => {
            res.send(purchased);
        }).catch(err => res.status(403).send(err));
    }
);

purchaseController.get('/:id', verifyToken,
    (req: Request, res: Response) => {
        Transaction.findByPk(req.params.id).then(found => {
            res.send(found);
        }).catch(err => res.status(403).send(err));
    }
);

purchaseController.get('/confirm/:id', verifyToken,
    (req: Request, res: Response) => {
        purchaseService.confirmTransaction(parseInt(req.params.id, 10))
            .then(() => res.status(200).send())
            .catch(err => res.status(500).send(err));
    }
);



export const PurchaseController: Router = purchaseController;
