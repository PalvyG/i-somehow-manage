import passport from 'passport';
import { Strategy as GithubStrat } from 'passport-github2';
import factory from '../persistence/factory.js';
const { daoUser } = factory;
import 'dotenv/config'


const stratOptions = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}

const auth = async (accessToken, refreshToken, profile, done) => {
    try {
        const userEmail = profile._json.email ? profile._json.email : profile._json.blog
        const findUser = await daoUser.getUserByEmail(userEmail)
        if (!findUser) {
            let nameSplit = profile._json.name.split(' ')
            const firstnameSplit = () => {
                if (nameSplit.length >= 4) {
                    let result = nameSplit[(nameSplit.length - 4)] + ' ' + nameSplit[(nameSplit.length - 3)]
                    return result
                } else if (nameSplit.length = 3) {
                    let result = nameSplit[(nameSplit.length - 3)]
                    return result
                } else {
                    let result = nameSplit[(nameSplit.length - 2)]
                    return result
                }
            }
            const lastnameSplit = () => {
                if (nameSplit.length >= 3) {
                    let result = nameSplit[(nameSplit.length - 2)] + ' ' + nameSplit[(nameSplit.length - 1)]
                    return result
                } else {
                    let result = nameSplit[(nameSplit.length - 1)]
                    return result
                }
            }
            const newUser = {
                firstname: firstnameSplit(),
                lastname: lastnameSplit(),
                age: 23,
                email: userEmail,
                password: '',
                access: 'github'
            }
            const result = await daoUser.createUser(newUser)
            return done(null, result)
        } else return done(null, findUser)
    } catch (err) { winlog.error(err) }
}

const githubAuthStrat = new GithubStrat(stratOptions, auth)

passport.use('github', githubAuthStrat)
