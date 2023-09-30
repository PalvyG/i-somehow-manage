import factory from '../persistence/factory.js';
import { winlog } from '../loggers/loggers.js';
const { daoTicket } = factory

export class RepoTicket {
    constructor() { }

    async getAllTickets() {
        try {
            return await daoTicket.getAllTickets()
        } catch (err) { winlog.error(err) }
    }

    async getUserTicket(email) {
        try {
            const arrTicket = await daoTicket.getUserTicket(email)
            return arrTicket
        } catch (err) { winlog.error(err) }
    }

    async createTicket(ticket) {
        try {
            const newTicket = await daoTicket.createTicket(ticket)
            return newTicket
        } catch (err) { winlog.error(err) }
    }
}