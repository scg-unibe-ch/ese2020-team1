import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.isAdmin = false;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                userName: loginRequestee.userName
            }
        })
        .then(user => {
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the lognin request
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId, isAdmin: user.isAdmin }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject({ message: 'not authorized' });
            }
        })
        .catch(err => Promise.reject({ message: err }));
    }

    // Delete a user by id
    public deleteUser(id: string): Promise<number> {
        return User.findByPk(parseInt(id, 10))
            .then(found => {
                if (found != null) {
                    found.destroy();
                    return Promise.resolve(found.userId);
                } else {
                    return Promise.reject({ message: 'deletion failed' });
                }
            })
            .catch(err => Promise.reject({ message: err }));
    }

    public getUserById(id: number): Promise<User> {
        return User.findByPk(id)
            .then((found) => Promise.resolve(found))
            .catch((err) => Promise.reject(err));
    }

    public isUsernameFree(userName: string): Promise<boolean> {
        return User.findOne({
            where: {
                userName: userName
            }
        })
            .then(user => {
                return Promise.resolve(user === null);
            })
            .catch(err => {
                return Promise.reject({ message: err });
            });
    }


    public isEmailFree(email: string): Promise<boolean> {
        return User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                return Promise.resolve(user === null);
            });

    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }
}
