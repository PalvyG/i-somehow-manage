import fs from 'fs';
import { winlog } from '../../../loggers/loggers.js';
const path = './products.json'

export class DaoFSProduct {
    constructor() { };

    async #getMaxId() {
        let maxId = 0;
        const products = await this.getProducts();
        products.map((prod) => {
            if (prod.id > maxId) maxId = prod.id;
        });
        return maxId;
    }

    async addProduct(prod) {
        try {
            const obj = {
                id: await this.#getMaxId() + 1,
                ...prod
            };
            const productsFile = await this.getProducts();
            productsFile.push(obj)
            await fs.promises.writeFile(path, JSON.stringify(productsFile))
            return obj
        } catch (err) { winlog.error(err) }
    }

    async getProducts() {
        try {
            if (fs.existsSync(path)) {
                const products = await fs.promises.readFile(path, 'utf-8')
                const productsJS = JSON.parse(products)
                return productsJS
            } else { return [] }
        } catch (err) { winlog.error(err) }
    }

    async getProductById(id) {
        try {
            const products = await fs.promises.readFile(path, 'utf-8')
            const productsJS = JSON.parse(products)
            const foundProduct = productsJS.find((product) => product.id === id)
            if (foundProduct) return foundProduct
        } catch (err) { winlog.error(err) }
    }

    async updateProduct(id, obj) {
        try {
            const products = await fs.promises.readFile(path, 'utf-8')
            const productsJS = JSON.parse(products)
            const indexFound = productsJS.findIndex((product) => product.id === id)
            if (indexFound === 0 || indexFound) {
                productsJS[indexFound] = { id, ...obj }
                await fs.promises.writeFile(path, JSON.stringify(productsJS))
            } else return `Error: Could not find product with specified ID (ID: ${id})`
        } catch (err) { winlog.error(err) }
    }

    async deleteProduct(id) {
        try {
            const products = await fs.promises.readFile(path, 'utf-8')
            const productsJS = JSON.parse(products)
            const foundIndex = productsJS.findIndex((product) => product.id == id)
            if (productsJS.find((product) => product.id === id)) {
                productsJS.splice(foundIndex, 1)
                await fs.promises.writeFile(path, JSON.stringify(productsJS));
            }
            const productsFile = await this.getProducts();
            await fs.promises.writeFile(path, JSON.stringify(productsFile));
        } catch (err) { winlog.error(err) }
    }

    async deleteAllProducts() {
        try {
            if(fs.existsSync(path)){
                await fs.promises.unlink(path)
            }
        } catch (err) { winlog.error(err) }
    }
}

export const daoFsProduct = new DaoFSProduct;