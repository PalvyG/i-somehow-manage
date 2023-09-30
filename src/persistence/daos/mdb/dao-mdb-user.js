import { modelUser } from './models/model-user.js';
import { modelCart } from './models/model-cart.js';
import { createHash, isValidPassword } from '../../../utils.js';
import { winlog } from '../../../loggers/loggers.js';

export class DaoMDBUser {
    constructor() { }

    async createUser(user) {
        try {
            const findUser = await modelUser.findOne({ email: user.email })
            if (!findUser) {
                const newCart = await modelCart.create({})
                if (user.email.includes('.admin') && user.password.includes('.admin')) {
                    const newAdmin = await modelUser.create({ ...user, password: createHash(user.password), role: 'admin', cartId: newCart })
                    return newAdmin
                } else {
                    const newUser = await modelUser.create({ ...user, password: createHash(user.password), cartId: newCart });
                    return newUser
                }
            }
        } catch (err) { winlog.error(err) }
    }

    async loginUser(user) {
        try {
            const findUser = await modelUser.findOne({ email: user.email })
            if (findUser) {
                const passValid = isValidPassword(user.password, findUser)
                const result = passValid ? findUser : false
                return result
            } else { return null }
        } catch (err) { winlog.error(err) }
    }

    async getUserByEmail(email) {
        try {
            const findUser = await modelUser.findOne({ email: email });
            const result = findUser ? findUser : false;
            return result
        } catch (err) { winlog.warning(err) }
    }

    async getUserById(id) {
        try {
            const findUser = await modelUser.findById(id);
            const result = findUser ? findUser : false;
            return result
        } catch (err) { winlog.warning(err) }
    }
}