import express from 'express';
import { Router, Request, Response } from 'express';
import { ProductAttributes, Product } from '../models/product.model';
import { ProductService } from '../services/Product.service';
import { verifyToken, verifyAdmin } from '../middlewares/checkAuth';
import { Comment, CommentAttributes} from '../models/comment.model';
import { CommentService } from '../services/comment.service';

const commentController: Router = express.Router();
const commentService = new CommentService();

commentController.get('/get-comment/:id', (req: Request, res: Response) => {
    commentService.getComments(req.params.id)
        .then((comment: Array<CommentAttributes>) => res.status(200).send(comment))
        .catch(err => res.status(500).send(err));
});

commentController.post('/add-comment/:id', (req: Request, res: Response) => {
    const prodId = parseInt(req.params.id, 10);
    commentService.addComment(prodId, req.body)
        .then((added) => res.status(200).send(added))
        .catch(err => res.status(500).send(err));
});

export const CommentController: Router = commentController;
