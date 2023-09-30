import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';

const schemaProd = new Schema({
    title: { type: String, required: true },
    desc: { type: String, default: 'No description provided.' },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    cat: { type: String, default: 'other' },
    status: { type: Boolean, default: true },
    qty: { type: Number }
})

schemaProd.plugin(mongoosePaginate)

export const modelProd = model(
    'products',
    schemaProd
);