import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { Product } from './product.model';

export interface UserAttributes {
    isAdmin: boolean;
    userId: number;
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;
    street: string;
    zip: number;
    city: string;
    country: string;
    phone: string;
    walletId: number;
}

// The userId and wallet attributes are optional in User.build and User.create calls
export interface UserCreationAttributes extends Optional<UserAttributes, 'userId' | 'walletId' > { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    userName!: string;
    password!: string;
    // Additional user attributes
    email!: string; // the `null assertion` `!` is required in strict mode.
    firstName!: string;
    lastName!: string;
    birthday!: Date;
    gender!: string;
    street!: string;
    zip!: number;
    city!: string;
    country!: string;
    phone!: string;
    walletId!: number;
    isAdmin!: boolean;

    public static initialize(sequelize: Sequelize) {
        User.init({
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
            walletId: {
                type: DataTypes.INTEGER,
                defaultValue: 100
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }

        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
    public static createAssociations() {
        User.hasMany(Product, {
            as: 'product',
            foreignKey: 'productId'
        });
    }
}
