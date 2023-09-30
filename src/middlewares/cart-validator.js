import factory from "../persistence/factory.js";
import { winlog } from "../loggers/loggers.js";
const { daoUser } = factory

export const cartBodyValidation = async (req, res, next) => {
    try {
        const cart = req.body
        if (!cart.products || cart.products.length === 0) {
            res.status(400).json({
                message: '(!) Invalid or missing property or value.',
                details: "(i) Cart must be updated with at least 1 product. For deletion of all products, please use the delete request."
            })
        } else {
            next();
        }
    } catch (err) { winlog.error(err) }
}

export const cartUserValidation = async (req, res, next) => {
    try {
        const isLoggedIn = req.session.passport
        if (isLoggedIn) {
            const user = await daoUser.getUserById(req.session.passport.user)
            if (user.cartId.toString() === req.params.cid) {
                next()
            } else {
                res.status(403).json({ message: "(!) You are not authorized to access this endpoint." })
            }
        } else if (isLoggedIn == undefined) {
            res.status(400).json({ message: "(!) You must be logged in to access this endpoint." })
        }
    } catch (err) { winlog.error(err) }
}