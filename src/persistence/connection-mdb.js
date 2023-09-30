import mongoose from 'mongoose';
import 'dotenv/config'
import { winlog } from '../loggers/loggers.js';
 
export const initMDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        winlog.info('Connection with MongoDB Atlas database established successfully')
    } catch (err) { winlog.fatal(err) }
}