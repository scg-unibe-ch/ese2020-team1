import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from './user.model';
import { Product } from './product.model';



export class Admin extends User {
    public static initialize(sequelize: Sequelize) {
        Admin.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            birthday: {
                type: DataTypes.DATE,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false
            },
            zip: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            wallet: {
                type: DataTypes.INTEGER,
                defaultValue: 100
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }

        },
            {
                sequelize,
                tableName: 'admins'
            }
        );
    }
    public static createAssociations() {
        Admin.hasMany(Product, {
            as: 'product',
            foreignKey: 'productId'
        });
    }
}
