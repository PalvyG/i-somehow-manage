import passport from 'passport';
import { Strategy as LocalStrat } from 'passport-local';
import factory from '../persistence/factory.js';
const { daoUser } = factory;

const stratOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const register = async (req, email, password, done) => {
    try {
        const findUser = await daoUser.getUserByEmail(email);
        if (findUser) {
            return done(null, false);
        } else {
            const newUser = await daoUser.createUser(req.body);
            return done(null, newUser);
        }
    } catch (err) { winlog.error(err) }
}

const login = async (req, email, password, done) => {
    try {
        const user = { email, password }
        const loginUser = await daoUser.loginUser(user)
        return done(null, loginUser)
    } catch (err) { winlog.error(err) }
}

const registerStrat = new LocalStrat(stratOptions, register)
const loginStrat = new LocalStrat(stratOptions, login)

passport.use('register', registerStrat)
passport.use('login', loginStrat)

passport.serializeUser(async (user, done) => {
    const usr = await daoUser.getUserById(user._id)
    done(null, usr._id);
});

passport.deserializeUser(async (id, done) => {
    const usr = await daoUser.getUserById(id);
    return done(null, usr);
});
