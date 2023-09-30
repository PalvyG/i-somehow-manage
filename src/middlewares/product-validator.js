import { winlog } from "../loggers/loggers.js";

export const productValidator = (req, res, next) => {
    try {
        const prod = req.body;
        if (prod.title !== undefined && prod.price !== undefined && prod.stock !== undefined) {
            next()
        } else {
            res.status(400).json({
                message: '(!) Invalid or missing property or value.',
                details: "(i) Product must contain the following properties: title, desc, price, stock, cat, status, code."
            })
        }
    } catch (err) { winlog.warning(err) }
}