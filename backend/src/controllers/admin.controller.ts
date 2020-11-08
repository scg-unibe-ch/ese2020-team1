
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { AdminService } from '../services/admin.service';

const adminController: Router = express.Router();
const adminService = new AdminService();
const userService = new UserService();

adminController.post('/register',
    (req: Request, res: Response) => {
        adminService.register(req.body)
            .then(() => userService.register(req.body)) // Register ad admin also as a user
                .then(registered => res.send(registered))
                .catch(err => res.status(403).send(err));
    }
);

adminController.delete('/:id', (req: Request, res: Response) => {
    // Delete Admin only in the admin table, can continue to live as a user
    adminService.deleteAdmin(req.params.id).then(item => res.status(200).send({ deleted: item })).catch(err => res.status(403).send(err));

});

adminController.get('approve-product/:id', verifyToken, (req: Request, res: Response) => {
    adminService.approveProduct(req.params.id)
        .then(item => res.status(200).send({ approved: item }))
        .catch(err => res.status(403).send(err));
});

export const AdminController: Router = adminController;
