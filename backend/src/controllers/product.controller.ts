import express from 'express';
import { Router, Request, Response } from 'express';
import { ProductAttributes, Product } from '../models/product.model';
import { ProductService } from '../services/Product.service';
import { verifyToken, verifyAdmin } from '../middlewares/checkAuth';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/add', verifyToken, (req: Request, res: Response) => {
    const userId: number = req.body.tokenPayload.userId;
    const userName: string = req.body.tokenPayload.userName;
    productService.create(req.body, userId, userName)
        .then(added => res.send(added))
        .catch(err => res.status(500).send(err));
});

productController.put('/modify/:id', verifyToken, (req: Request, res: Response) => {
    const productId = parseInt(req.params.id, 10);
    productService.modify(productId, req.body)
        .then((modified) => res.status(200).send(modified))
        .catch(err => res.status(500).send(err));
});

productController.delete('/delete/:id', verifyToken, (req: Request, res: Response) => {
    const productId = parseInt(req.params.id, 10);
    productService.delete(productId)
        .then(() => res.status(200).send())
        .catch(err => res.status(500).send(err));
});

productController.get('/all', (req: Request, res: Response) => {
    productService.getAll()
        .then((product: Array<ProductAttributes>) => res.status(200).send(product))
        .catch(err => res.status(500).send(err));
});

productController.get('/pending', verifyToken, verifyAdmin, (req: Request, res: Response) => {
    productService.getPending()
        .then((product: Array<ProductAttributes>) => res.status(200).send(product))
        .catch(err => res.status(500).send(err));
});

productController.get('/approved', (req: Request, res: Response) => {
    productService.getApproved()
        .then((product: Array<ProductAttributes>) => res.status(200).send(product))
        .catch(err => res.status(500).send(err));
});

productController.get('/disapproved', (req: Request, res: Response) => {
    productService.getDisapproved()
        .then((product: Array<ProductAttributes>) => res.status(200).send(product))
        .catch(err => res.status(500).send(err));
});

productController.get('/by-product/:id', (req: Request, res: Response) => {
    productService.getById(req.params.id)
        .then((product: ProductAttributes) => res.status(200).send(product))
        .catch(err => res.status(500).send(err));
});

 productController.get('/by-user', verifyToken, (req: Request, res: Response) => {
    productService.getByUser(req.body.tokenPayload.userId)
        .then((product: Array<ProductAttributes>) => res.status(200).send(product))
        .catch(err => res.status(500).send(err));
 });

// productController.get('/category/:category', (req: Request, res: Response) => {
//    productService.getByCategory(req.params.category)
//        .then((product) => res.status(200).send(product))
//        .catch(err => res.status(500).send(err));
// });

productController.get('/search', (req: Request, res: Response) => {
    productService.search(req.body)
        .then((product: Array<ProductAttributes>) => res.status(200).send(product))
        .catch(err => res.status(500).send(err));
});

export const ProductController: Router = productController;
