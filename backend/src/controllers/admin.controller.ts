
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken, verifyAdmin } from '../middlewares/checkAuth';
import { AdminService } from '../services/admin.service';

const adminController: Router = express.Router();
const adminService = new AdminService();
const userService = new UserService();

adminController.post('/register',
    (req: Request, res: Response) => {
        adminService.register(req.body)
            .then(registered => res.status(200).send(registered))
            .catch(err => res.status(403).send(err));
    }
);

adminController.delete('/:id', (req: Request, res: Response) => {
    adminService.deleteAdmin(req.params.id)
        .then(item => res.status(200).send({ deleted: item }))
        .catch(err => res.status(403).send(err));

});

adminController.get('/approve-product/:id', verifyToken, verifyAdmin, (req: Request, res: Response) => {
     adminService.approveProduct(req.params.id)
        .then(item => res.status(200).send({ approved: item }))
        .catch(err => res.status(403).send(err));
});

adminController.get('/disapprove-product/:id', verifyToken, verifyAdmin, (req: Request, res: Response) => {
    adminService.disapproveProduct(req.params.id)
        .then(item => res.status(200).send({ approved: item }))
        .catch(err => res.status(403).send(err));
});

adminController.get('/verify-admin', verifyToken, verifyAdmin, (req: Request, res: Response) => {
    res.status(200).send({message: true});
});

export const AdminController: Router = adminController;
