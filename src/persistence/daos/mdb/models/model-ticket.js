import { Schema, model } from 'mongoose';

const schemaTicket = new Schema({
    code: { type: String, required: true },
    created_at: { type: Date, required: true },
    purchaser: { type: String, required: true },
    products: [
        {
            _id: { type: Schema.Types.ObjectId, required: true, ref: 'products' },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            amount: { type: Number, required: true }
        },
    ],
    total: { type: Number, require: true }
})

export const modelTicket = model('tickets', schemaTicket);