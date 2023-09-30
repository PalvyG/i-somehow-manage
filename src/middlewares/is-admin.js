import factory from "../persistence/factory.js"
import { winlog } from "../loggers/loggers.js"
const { daoUser } = factory

export const isAdmin = async (req, res, next) => {
    try {
        const isLoggedIn = req.session.passport
        if (isLoggedIn) {
            const user = await daoUser.getById(req.session.passport.user)
            if (user.role === 'admin') {
                next()
            } else {
                res.status(403).json({ message: "(!) You are not authorized to access this endpoint." })
            }
        } else {
            res.status(400).json({ message: "(!) You must be logged in as an administrator to access this endpoint." })
        }
    } catch (err) { winlog.error(err) }
}