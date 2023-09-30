import { Schema, model } from 'mongoose'
const schemaCart = new Schema({
    products: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'products',
        },
        price: { type: Number, required: true },
        qty: { type: Number, default: 1 },
        amount: { type: Number, required: true }
    }],
    total: { type: Number,  default: 0, required: true }
})

schemaCart.pre('findOne', function () {
    this.populate('products._id')
})

export const modelCart = model(
    'carts',
    schemaCart
);