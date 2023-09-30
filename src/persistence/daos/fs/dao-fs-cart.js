import fs from 'fs';
import { winlog } from '../../../loggers/loggers.js';
const pathCarts = './carts.json'
const pathProducts = './products.json'

export class DaoFSCart {
    constructor() { };

    async #getMaxId() {
        let maxId = 0;
        const carts = await this.getCarts();
        carts.map((cart) => {
            if (cart.id > maxId) maxId = cart.id;
        });
        return maxId;
    }

    async createCart() {
        try {
            const cart = {
                id: await this.#getMaxId() + 1,
                products: []
            };
            const cartsFile = await this.getCarts();
            cartsFile.push(cart)
            await fs.promises.writeFile(pathCarts, JSON.stringify(cartsFile))
            return cart
        } catch (err) { winlog.error(err) }
    }

    async getCarts() {
        try {
            if (fs.existsSync(pathCarts)) {
                const carts = await fs.promises.readFile(pathCarts, 'utf-8')
                const cartsJS = JSON.parse(carts)
                return cartsJS
            } else return []
        } catch (err) { winlog.error(err) }
    }

    async getCartById(id) {
        try {
            const carts = await fs.promises.readFile(pathCarts, 'utf-8')
            const cartsJS = JSON.parse(carts)
            const foundCart = cartsJS.find((cart) => cart.id === id)
            if (foundCart) return foundCart
        } catch (err) { winlog.error(err) }
    }

    async addToCart(cid, pid) {
        try {
            const cartsFile = await fs.promises.readFile(pathCarts, 'utf-8')
            const cartsJS = JSON.parse(cartsFile)
            const foundCart = cartsJS.find((cart) => cart.id === cid)
            if (foundCart) {
                const productsFile = await fs.promises.readFile(pathProducts, 'utf-8')
                const productsJS = JSON.parse(productsFile)
                const foundProduct = productsJS.find((prod) => prod.id === pid)
                if (foundProduct) {
                    const prodInCart = foundCart.products.find((prod) => prod.id === foundProduct.id)
                    if (!prodInCart) {
                        const pushedProduct = {
                            id: foundProduct.id,
                            qty: 1
                        }
                        foundCart.products.push(pushedProduct)
                        await fs.promises.writeFile(pathCarts, JSON.stringify(cartsJS))
                    } else {
                        prodInCart.qty++
                        await fs.promises.writeFile(pathCarts, JSON.stringify(cartsJS))
                    }
                } else return 'prod_404'
            } else return 'cart_404'
        } catch (err) { winlog.error(err) }
    }

    async deleteCart(id) {
        try {
            const carts = await fs.promises.readFile(pathCarts, 'utf-8')
            const cartsJS = JSON.parse(carts)
            const foundIndex = cartsJS.findIndex((cart) => cart.id == id)
            if (cartsJS.find((cart) => cart.id === id)) {
                cartsJS.splice(foundIndex, 1)
                await fs.promises.writeFile(pathCarts, JSON.stringify(cartsJS));
            }
            const cartsFile = await this.getCarts();
            await fs.promises.writeFile(pathCarts, JSON.stringify(cartsFile));
        } catch (err) { winlog.error(err) }
    }

    async deleteAllCart() {
        try {
            if (fs.existsSync(pathCarts)) {
                await fs.promises.unlink(pathCarts)
            }
        } catch (err) { winlog.error(err) }
    }
}