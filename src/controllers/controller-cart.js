import { RepoCarts } from "../repository/repo-cart.js";
import { winlog } from "../loggers/loggers.js";

const repoCart = new RepoCarts();

export class ControllerCarts {
    constructor() { }

    async getCartCtrl(req, res, next) {
        try {
            const { limit } = req.query
            const docs = await repoCart.getCartSvc();
            if (limit >= 0) {
                const limitDocs = docs.slice(0, limit)
                res.status(200).json(limitDocs)
            } else {
                res.status(200).json(docs)
            }
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async getCartByIdCtrl(req, res, next) {
        try {
            const { cid } = req.params
            const doc = await repoCart.getCartByIdSvc(cid)
            doc ? res.status(200).json({ message: '(i) Cart found successfully!', cart: doc }) : res.status(404).json({ message: '(!) Cart not found by the controller.' })
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async addToCartCtrl(req, res, next) {
        try {
            const { cid, pid } = req.params
            let { qty } = req.query
            if (!qty) qty = 1
            const cart = await repoCart.getCartByIdSvc(cid)
            if (cart) {
                if (pid) {
                    await repoCart.addToCartSvc(cid, pid, qty)
                    const cartUpd = await repoCart.getCartByIdSvc(cid)
                    res.status(200).json({ message: `(i) Product was successfully added to cart! (ID: ${pid})`, update: cartUpd })
                } else {
                    res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${pid}).` })
                }
            } else {
                res.status(404).json({ message: `(!) Could not find cart with specified ID (ID: ${cid}).` })
            }
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async updateCartCtrl(req, res, next) {
        try {
            const { cid } = req.params;
            const arr = req.body;
            if (!cid) {
                res.status(404).json({ message: `(!) Could not find cart with specified ID (ID: ${cid}).` })
            } else {
                const cart = await repoCart.updateCartSvc(cid, arr)
                res.status(200).json({ message: `(i) Cart updated successfully!`, update: cart })
            }
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async deleteProdFromCartCtrl(req, res, next) {
        try {
            const { cid, pid } = req.params
            const cart = await repoCart.getCartByIdSvc(cid)
            if (cart) {
                if (pid) {
                    await repoCart.deleteProdFromCartSvc(cid, pid)
                    const cartUpd = await repoCart.getCartByIdSvc(cid)
                    res.status(200).json({ message: `(i) Product was successfully removed from cart (ID: ${pid})`, update: cartUpd })
                } else {
                    res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${pid}).` })
                }
            } else {
                res.status(404).json({ message: `(!) Could not find cart with specified ID (ID: ${cid}).` })
            }
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async deleteAllProdFromCartCtrl(req, res, next) {
        try {
            const { cid } = req.params;
            if (!cid) {
                res.status(404).json({ message: `(!) Could not find cart with specified ID (ID: ${cid}).` })
            } else {
                const cart = await repoCart.deleteAllProdFromCartSvc(cid)
                res.status(200).json({ message: `(i) All products removed from cart successfully.`, update: cart })
            }
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }
}