import { Router } from 'express';
import { ControllerProducts } from '../controllers/controller-prod.js';
import { productValidator } from '../middlewares/product-validator.js';
import { isAdmin } from '../middlewares/is-admin.js';
const ctrlProducts = new ControllerProducts();

const router = Router();

router.get('/', ctrlProducts.getProdCtrl)
router.get('/:pid', ctrlProducts.getProdByIdCtrl)
router.post('/', productValidator, isAdmin, ctrlProducts.addProdCtrl)
router.put('/:pid', productValidator, isAdmin, ctrlProducts.updateProdCtrl)
router.delete('/:pid', isAdmin, ctrlProducts.deleteProdCtrl)
router.delete('/', isAdmin, ctrlProducts.deleteAllProdCtrl)

export default router