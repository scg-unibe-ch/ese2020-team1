import express from 'express';
import { Router, Request, Response } from 'express';
import { ProductAttributes, Product } from '../models/product.model';
import { ProductService } from '../services/Product.service';
import { verifyToken } from '../middlewares/checkAuth';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/add', verifyToken, (req: Request, res: Response) => {
    productService.create(req.body)
        .then(added => res.send(added))
        .catch(err => res.status(500).send(err));
});

productController.put('/modify/:id', verifyToken, (req: Request, res: Response) => {
    // TODO
});

productController.delete('/delete/:id', verifyToken, (req: Request, res: Response) => {
    // TODO
});

productController.get('/all', verifyToken, (req: Request, res: Response) => {
    productService.getAll()
        .then((product: Array<ProductAttributes>) => res.send(product))
        .catch(err => res.status(500).send(err));
});

export const ProductController: Router = productController;
