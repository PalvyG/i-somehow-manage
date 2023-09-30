import factory from '../persistence/factory.js';
import { winlog } from '../loggers/loggers.js';
const { daoProd } = factory

export class RepoProducts {
    constructor() { }

    async addProdSvc(prod) {
        try {
            const newDoc = await daoProd.addProduct(prod)
            if (!newDoc) throw new Error(`(!) Validation error by the service.`)
            else return newDoc
        } catch (err) { winlog.error(err) }
    }

    async getProdSvc(page, limit, sort, filter) {
        try {
            const docs = await daoProd.getProducts(page, limit, sort, filter);
            return docs
        } catch (err) { winlog.error(err) }
    }

    async getProdByIdSvc(id) {
        try {
            const doc = await daoProd.getProductById(id);
            if (!doc) throw new Error(`(!) Product not found by the service.`)
            else return doc
        } catch (err) { winlog.error(err) }
    }

    async updateProdSvc(id, prod) {
        try {
            const oldDoc = await daoProd.getProductById(id)
            if (!oldDoc) {
                throw new Error(`(!) Product not found by the service.`)
            } else {
                const newDoc = await daoProd.updateProduct(id, prod);
                return newDoc
            }
        } catch (err) { winlog.error(err) }
    }

    async deleteProdSvc(id) {
        try {
            const doc = await daoProd.deleteProduct(id)
            return doc
        } catch (err) { winlog.error(err) }
    }

    async deleteAllProdSvc() {
        try {
            await daoProd.deleteAllProducts()
        } catch (err) { winlog.error(err) }
    }
}
