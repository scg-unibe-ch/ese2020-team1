import { ProductAttributes, Product } from '../models/product.model';
import { Comment, CommentAttributes } from '../models/comment.model';
import { User } from '../models/user.model';

const { Op } = require('sequelize');

export class CommentService {

    public getComments(productId: string): Promise<Comment[]> {
        return Comment.findAll({
            where: {
                productId: parseInt(productId, 10)
            },
        }).then(found => Promise.resolve(found))
            .catch(err => Promise.reject(err));
    }

    public addComment(id: number, commentatr: CommentAttributes): Promise<CommentAttributes> {
        commentatr.productId = id;
        return Comment.create(commentatr)
            .then(added => Promise.resolve(added))
            .catch(err => Promise.reject(err));
    }
}
