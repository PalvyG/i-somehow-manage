import { modelCart } from './models/model-cart.js'
import { modelProd } from './models/model-prod.js'
import { winlog } from '../../../loggers/loggers.js';

export class DaoMDBCart {
    constructor() { }

    async createCart() {
        try {
            const response = await modelCart.create({});
            return response
        } catch (err) { winlog.error(err) }
    }

    async getCarts() {
        try {
            const response = await modelCart.find({});
            return response
        } catch (err) { winlog.error(err) }
    }

    async getCartById(id) {
        try {
            const response = await modelCart.findById({ _id: id });
            return response
        } catch (err) { winlog.error(err) }
    }

    async addToCart(cid, pid, qty) {
        try {
            const cart = await modelCart.findById({ _id: cid });
            const prod = await modelProd.findById({ _id: pid });
            const index = cart.products.findIndex((obj) => obj._id.toString() == prod._id.toString())
            if (index == 0 || index != -1) {
                const prodNoAmount = {
                    ...prod._doc,
                    price: prod.price,
                    qty: (cart.products[index].qty + Number(qty))
                }
                const prodPush = {
                    ...prodNoAmount,
                    amount: (prodNoAmount.qty * prod.price)
                }
                cart.products.splice(index, 1, prodPush)
                let amountArr = []
                cart.products.forEach((product) => {
                    amountArr.push(product.amount)
                })
                cart.total = amountArr.reduce((sum, price) => sum + price)
                cart.save();
            } else if (index == -1) {
                const prodPush = {
                    ...prod._doc,
                    price: prod.price,
                    qty: qty,
                    amount: (prod.price)
                }
                cart.products.push(prodPush)
                let amountArr = []
                cart.products.forEach((product) => {
                    amountArr.push(product.amount)
                })
                cart.total = amountArr.reduce((sum, price) => sum + price)
                cart.save();
            }
            const cartUpd = await modelCart.findById({ _id: cid });
            return cartUpd;
        } catch (err) { winlog.error(err) }
    }

    async updateCart(id, arr) {
        try {
            let amountArr = []
            arr.products.forEach((product) => {
                amountArr.push(product.amount)
            })
            let totalAmount = amountArr.reduce((sum, price) => sum + price)
            await modelCart.updateOne({ _id: id }, {
                $set: {
                    products: arr.products,
                    total: totalAmount
                }
            })
            const cart = await modelCart.findById(id)
            return cart
        } catch (err) { winlog.error(err) }
    }

    async deleteProdFromCart(cid, pid) {
        try {
            const cart = await modelCart.findById({ _id: cid });
            const prod = await modelProd.findById({ _id: pid });
            const index = cart.products.findIndex((obj) => obj._id.toString() == prod._id.toString())
            if (index == 0 || index != -1) {
                cart.products.splice(index, 1)
                let amountArr = []
                cart.products.forEach((product) => {
                    amountArr.push(product.amount)
                })
                cart.total = amountArr.reduce((sum, price) => sum + price)
                cart.save();
                const cartUpd = await modelCart.findById({ _id: cid });
                return cartUpd;
            }
        } catch (err) { winlog.error(err) }
    }

    async deleteAllProdFromCart(id) {
        try {
            await modelCart.updateOne({ _id: id }, {
                $set: {
                    products: [],
                    total: 0
                }
            })
            const cart = await modelCart.findById(id)
            return cart
        } catch (err) { winlog.error(err) }
    }
}