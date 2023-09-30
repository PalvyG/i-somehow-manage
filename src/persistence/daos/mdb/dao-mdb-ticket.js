import { modelTicket } from "./models/model-ticket.js";
import { winlog } from "../../../loggers/loggers.js";

export class DaoMDBTicket {
    constructor() { }

    async getAllTickets() {
        try {
            return await modelTicket.find({})
        } catch (err) { winlog.error(err) }
    }

    async getUserTicket(email) {
        try {
            const arrTicket = await modelTicket.find({
                purchaser: email
            })
            return arrTicket
        } catch (err) { winlog.error(err) }
    }

    async createTicket(ticket) {
        try {
            const newTicket = await modelTicket.create({
                ...ticket,
                cart: ticket.cart
            })
            return newTicket
        } catch (err) { winlog.error(err) }
    }
}