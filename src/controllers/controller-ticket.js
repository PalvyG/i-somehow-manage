import { RepoTicket } from "../repository/repo-ticket.js";
import { newTicketCode } from "../utils.js";
import factory from "../persistence/factory.js";
import { winlog } from "../loggers/loggers.js";
const { daoUser, daoCart } = factory
const repoTicket = new RepoTicket()

export class ControllerTicket {
    constructor() { }

    async getAllTicketsCtrl(req, res, next) {
        try {
            const response = await repoTicket.getAllTickets()
            res.status(200).json(response)
        } catch (err) {
            winlog.err(err)
            next(err)
        }
    }

    async getUserTicketCtrl(req, res, next) {
        try {
            const userFind = await daoUser.getUserById(req.session.passport.user)
            const arrTicket = await repoTicket.getUserTicket(userFind.email)
            if (arrTicket == false) {
                res.status(404).json({
                    message: "(!) You have no tickets in process.",
                    tip: "(i) Check out our products!",
                    endpoint: "/products"
                })
            } else if (arrTicket.length > 0) {
                res.status(200).json({ message: "(i) Tickets retrieved successfully.", tickets: arrTicket })
            } else res.status(500).json({ message: "(!) Something went wrong.", error: "(i) Internal server error." })
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }

    async createTicketCtrl(req, res, next) {
        try {
            const userFind = await daoUser.getUserById(req.session.passport.user)
            const userCart = await daoCart.getCartById(userFind.cartId)
            const newDate = new Date()
            const currDate = newDate.toUTCString()
            let cartAmount = 0;
            userCart.products.forEach((prod) => {
                cartAmount += prod.amount
            });
            const ticket = {
                code: await newTicketCode(),
                created_at: currDate,
                purchaser: userFind.email,
                products: userCart.products,
                total: cartAmount
            }
            const response = await repoTicket.createTicket(ticket)
            res.status(200).json({ message: "(i) Ticket created successfully.", ticket: response })
        } catch (err) {
            winlog.error(err)
            next(err)
        }
    }
}