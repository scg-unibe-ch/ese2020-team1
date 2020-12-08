import { Model, Sequelize, DataTypes } from 'sequelize';
import { Product } from './product.model';

export interface CommentAttributes {
    commentId: number;
    productId: number;
    comment: string;
}

export class Comment extends Model <CommentAttributes> implements CommentAttributes {
    commentId!: number;
    productId!: number;
    comment!: string;


    public static initialize(sequelize: Sequelize) {
        Comment.init({
            commentId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
            {sequelize, tableName: 'comments'}
        );
    }

    public static createAssociations() {
         Comment.belongsTo(Product, {
            targetKey: 'productId',
            as: 'product',
            onDelete: 'cascade',
            foreignKey: 'productId'
         });
    }
}
