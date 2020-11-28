import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface PurchaseRequestAttributes {
    requestId: number;
    transactionId: number;
    sellerId: number;
}

export interface PurchaseRequestCreationAttributes extends Optional<PurchaseRequestAttributes, 'requestId'> { }

export class PurchaseRequest extends Model<PurchaseRequestAttributes, PurchaseRequestCreationAttributes>
    implements PurchaseRequestAttributes {
    requestId!: number;
    transactionId!: number;
    sellerId!: number;


    public static initialize(sequelize: Sequelize) {
        PurchaseRequest.init({
            requestId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            transactionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sellerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }

        },
            {
                sequelize,
                tableName: 'purchaserequests'
            }
        );
    }
    public static createAssociations() {
        // Todo
    }
}

