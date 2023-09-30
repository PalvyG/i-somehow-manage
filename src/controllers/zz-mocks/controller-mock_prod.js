import { RepoMockProd } from '../../repository/zz-mocks/repo-mock_prod.js'
import { winlog } from '../../loggers/loggers.js'
const repoMockProd = new RepoMockProd();

export class ControllerMockProd {
    constructor() { }

    async addMockProdCtrl(req, res, next) {
        try {
            const { times } = req.query
            if (!times) {
                const newDocsPost = await repoMockProd.addMockProdSvc(5)
                res.status(200).json({ message: "(i) Mock products created successfully!", mocks: newDocsPost })
            } else if (times > 25) {
                const newDocsPost = await repoMockProd.addMockProdSvc(25)
                res.status(200).json({
                    alert: "(!) Woah there, that's too many products!",
                    message: "(i) 25 Mock products created successfully!",
                    mocks: newDocsPost
                })
            } else if (1 <= times <= 25) {
                const newDocsPost = await repoMockProd.addMockProdSvc(times)
                res.status(200).json({ message: "(i) Mock products created successfully!", mocks: newDocsPost })
            } else {
                const newDocsPost = await repoMockProd.addMockProdSvc(5)
                res.status(200).json({ message: "(i) Mock products created successfully!", mocks: newDocsPost })
            }
        } catch (err) {
            winlog.debug(err)
            next(err)
        }
    }

    async getMockProdCtrl(req, res, next) {
        try {
            const docs = await repoMockProd.getMockProdsSvc()
            res.status(200).json({ message: "(i) Mock products retrieved successfully!", mocks: docs })
        } catch (err) {
            winlog.debug(err)
            next(err)
        }
    }

    async deleteMockProdsCtrl(req, res, next) {
        try {
            await repoMockProd.deleteMockProdsSvc()
            res.status(200).json({ message: "(i) Mock products deleted successfully." })
        } catch (err) {
            winlog.debug(err)
            next(err)
        }
    }
}
