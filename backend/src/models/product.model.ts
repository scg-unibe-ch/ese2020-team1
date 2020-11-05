import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from './user.model';

export interface ProductAttributes {
    productId: number;
    isApproved: boolean;
    userName: string;
    productType: string;
    title: string;
    price: number;
    payFreq: string;
    // category: category;
    description: string;
    location: string;
    status: string;
    delivery: boolean;
}

// tells sequelize that todoItemId is not a required field
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }


export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId: number;
    isApproved: boolean;
    userName: string;
    productType: string;
    title: string;
    price: number;
    payFreq: string;
    // category: category;
    description: string;
    location: string;
    status: string;
    delivery: boolean;


    public static initialize(sequelize: Sequelize) { // definition for database
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            payFreq: {
                type: DataTypes.STRING,
                allowNull: false
            },
            // category: {
            //    type: DataTypes.STRING,
            //    allowNull: false
            // },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            delivery: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
        },
        { sequelize, tableName: 'products' }
        );

    }
    public static createAssociations() {
        Product.belongsTo(User, {
            targetKey: 'userId',
            as: 'user',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }

}
