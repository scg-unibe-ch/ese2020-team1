import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface TransactionAttributes {
    transactionId: number;
    productId: number;
    productTitle: string;
    productType: string;
    sellerId: number;
    buyerId: number;
    buyerUserName: string;
    buyerFirstName: string;
    buyerLastName: string;
    buyerStreet: string;
    buyerZip: number;
    buyerCity: string;
    buyerCountry: string;
    totalPrice: number;
    time: number;
    messageToSeller: string;
    delivery: boolean;
    payFreq: string;
    confirmed: boolean;

}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'transactionId'> { }

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    transactionId!: number;
    productId!: number;
    productTitle!: string;
    productType!: string;
    sellerId!: number;
    buyerId!: number;
    buyerUserName!: string;
    buyerFirstName: string;
    buyerLastName: string;
    buyerStreet!: string;
    buyerZip!: number;
    buyerCity!: string;
    buyerCountry!: string;
    totalPrice!: number;
    time!: number;
    messageToSeller!: string;
    delivery!: boolean;
    payFreq!: string;
    confirmed!: boolean;


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
            productTitle: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productType: {
                type: DataTypes.STRING,
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
            buyerUserName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buyerFirstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buyerLastName: {
                type: DataTypes.STRING,
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
            },
            time: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            delivery: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            payFreq: {
                type: DataTypes.STRING,
                allowNull: false
            },
            confirmed: {
                type: DataTypes.BOOLEAN,
                allowNull: false
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

