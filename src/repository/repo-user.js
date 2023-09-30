import factory from '../persistence/factory.js';
import { winlog } from '../loggers/loggers.js';
const { daoUser } = factory

export class RepoUser {
    constructor() { }

    async createUserSvc(user) {
        try {
            const newDoc = await daoUser.createUser(user)
            return newDoc
        } catch (err) { winlog.error(err) }
    }

    async loginUserSvc(user) {
        try {
            const doc = await daoUser.loginUser(user)
            return doc
        } catch (err) { winlog.error(err) }
    }
}