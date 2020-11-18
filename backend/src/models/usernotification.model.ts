import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { Product } from './product.model';

export interface UserNotificationAttributes {
    notificationId: number;
    transactionId: number;
    sellerId: number;
}

// The userId and wallet attributes are optional in User.build and User.create calls
export interface UserNotificationCreationAttributes extends Optional<UserNotificationAttributes, 'notificationId'> { }

export class UserNotification extends Model<UserNotificationAttributes,
    UserNotificationCreationAttributes> implements UserNotificationAttributes {
    notificationId!: number;
    transactionId!: number;
    sellerId!: number;

    public static initialize(sequelize: Sequelize) {
        UserNotification.init({
            notificationId: {
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
                tableName: 'usernotifications'
            }
        );
    }
}
