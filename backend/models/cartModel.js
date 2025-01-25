import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            pinId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pin', required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
});

export const Cart = mongoose.model('Cart', cartSchema);
