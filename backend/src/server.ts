import express, { Application , Request, Response } from 'express';
import morgan from 'morgan';
import { UserController } from './controllers/user.controller';
import { ProductController } from './controllers/product.controller';
import { PurchaseController } from './controllers/purchase.controller';
import { AdminController } from './controllers/admin.controller';
import { NotificationController } from './controllers/notification.controller';
import { Sequelize } from 'sequelize';
import { User } from './models/user.model';
import { Product } from './models/product.model';
import { Transaction } from './models/transaction.model';
import { UserNotification } from './models/usernotification.model';
import { CommentController } from './controllers/comment.controller';
import { Comment } from './models/comment.model';

import cors from 'cors';
import { PurchaseRequest } from './models/purchaserequest.model';

export class Server {
    private server: Application;
    private sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();

        User.initialize(this.sequelize);
        Product.initialize(this.sequelize);
        User.createAssociations();
        Product.createAssociations();
        Transaction.initialize(this.sequelize);
        Transaction.createAssociations();
        UserNotification.initialize(this.sequelize);
        PurchaseRequest.initialize(this.sequelize);
        Comment.initialize(this.sequelize);
        Comment.createAssociations();



        this.sequelize.sync().then(() => {                           // create connection to the database
            this.server.listen(this.port, () => {                                   // start server on specified port
                console.log(`server listening at http://localhost:${this.port}`);   // indicate that the server has started
            });
        });
    }

    private configureServer(): Application {
        // options for cors middleware
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: `http://localhost:${this.port}`,
            preflightContinue: false,
        };

        return express()
            .use(cors())
            .use(express.json())                    // parses an incoming json to an object
            .use(morgan('tiny'))                    // logs incoming requests
            .use('/user', UserController)
            .use('/product', ProductController)
            .use('/admin', AdminController)
            .use('/purchase', PurchaseController)
            .use('/notification', NotificationController)
            .use('/comment', CommentController)
            .options('*', cors(options))
            .use(express.static('./src/public'))
            // this is the message you get if you open http://localhost:3000/ when the server is running
            .get('/', (req, res) => res.send('<h1>Welcome to the ESE-2020 Backend Scaffolding <span style="font-size:50px">&#127881;</span></h1>'));
    }

    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: true // can be set to true for debugging
        });
    }
}

const server = new Server(); // starts the server
