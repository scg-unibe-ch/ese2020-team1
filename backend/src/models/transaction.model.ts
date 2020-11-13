import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface TransactionAttributes {
    transactionId: number;
    productId: number;
    sellerId: number;
    buyerId: number;
    buyerStreet: string;
    buyerZip: number;
    buyerCity: string;
    buyerCountry: string;
    totalPrice: number;
    messageToSeller: string;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'transactionId'> { }

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    transactionId!: number;
    productId!: number;
    sellerId!: number;
    buyerId!: number;
    buyerStreet!: string;
    buyerZip!: number;
    buyerCity!: string;
    buyerCountry!: string;
    totalPrice!: number;
    messageToSeller: string;


    public static initialize(sequelize: Sequelize) {
        Transaction.init({
            transactionId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sellerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            buyerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            buyerStreet: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buyerZip: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buyerCity: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buyerCountry: {
                type: DataTypes.STRING,
                allowNull: false
            },
            totalPrice: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            messageToSeller: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
            {
                sequelize,
                tableName: 'transactions'
            }
        );
    }
    public static createAssociations() {
        // Todo
    }
}

