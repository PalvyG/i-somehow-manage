import { RepoProducts } from "../repository/repo-prod.js";
import { winlog } from "../loggers/loggers.js";
const repoProd = new RepoProducts();

export class ControllerProducts {
    constructor() { }

    async addProdCtrl(req, res, next) {
        try {
            const newDoc = req.body
            const newDocPost = await repoProd.addProdSvc(newDoc)
            res.status(200).json({ message: "(i) Product added successfully!", product: newDocPost })
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async getProdCtrl(req, res, next) {
        try {
            let { page, limit, sort, filter } = req.query
            page == null ? page = 1 : page = page
            const result = await repoProd.getProdSvc(page, limit, sort, filter);
            const prevPageLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : null
            const nextPageLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : null
            res.json({
                status: result ? 'success' : 'error',
                payload: result.docs,
                info: {
                    totalDocs: result.totalDocs,
                    totalPages: result.totalPages,
                    currPage: Number(page),
                    prevPage: result.prevPage,
                    nextPage: result.nextPage,
                    hasPrevPage: result.hasPrevPage,
                    hasNextPage: result.hasNextPage,
                    prevPageLink,
                    nextPageLink
                }
            });
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async getProdByIdCtrl(req, res, next) {
        try {
            const { pid } = req.params
            const doc = await repoProd.getProdByIdSvc(pid)
            doc ? res.status(200).json({ message: '(i) Product found successfully!', product }) : res.status(404).json({ message:  `(!) Could not find product with specified ID (ID: ${pid}).` })
            res.json(doc)
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async updateProdCtrl(req, res, next) {
        try {
            const { title, desc, price, stock, cat, status, thumb } = req.body;
            const newDoc = { title, desc, price, stock, cat, status, thumb }
            const { pid } = req.params;
            const oldDoc = await repoProd.getProdByIdSvc(pid)
            if (oldDoc) {
                await repoProd.updateProdSvc(pid, newDoc)
                res.status(200).json({ message: `(i) "${newDoc.title}" (ID: ${pid}) was successfully updated!`, update: newDoc })
            } else {
                res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${pid}).` })
            }
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async deleteProdCtrl(req, res, next) {
        try {
            const { pid } = req.params;
            const doc = await repoProd.getProdByIdSvc(pid)
            if (doc) {
                res.status(200).json({ message: `(i) "${doc.title}" was deleted successfully. (ID: ${pid})` })
                await repoProd.deleteProdSvc(pid)
            } else {
                res.status(404).json({ message: `(!) Could not find product with specified ID (ID: ${pid}).` })
            }
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async deleteAllProdCtrl(req, res, next) {
        try {
            await repoProd.deleteAllProdSvc()
            res.status(200).json({ message: "(i) All products deleted successfully" })
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }
}
