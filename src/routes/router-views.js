import { Router } from 'express'
import { ControllerUsers } from '../controllers/controller-user.js'
const ctrlUser = new ControllerUsers();
const router = Router();

router.get('/index', async (req, res) => {
    res.render('index')
});

router.get('/login-err', async (req, res) => {
    res.render('login-err')
});

router.get('/login-ok', async (req, res) => {
    res.render('login-ok')
});

router.get('/login', async (req, res) => {
    res.render('login')
});

router.get('/products-realtime', async (req, res) => {
    res.render('products-realtime')
});

router.get('/register-err', async (req, res) => {
    res.render('register-err')
});

router.get('/register-ok', async (req, res) => {
    res.render('register-ok')
});

router.get('/register', async (req, res) => {
    res.render('register')
});

router.get('/profile', ctrlUser.getUserDtoResponse)

export default router;