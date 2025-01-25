import express from 'express';
import {isAuth} from '../middlewares/isAuth.js';
import {Cart} from '../models/cartModel.js';

const router = express.Router();

// Add an item to the cart
router.post('/add', isAuth, async (req, res) => {
    const { pinId } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (cart) {
            const item = cart.items.find((item) => item.pinId.toString() === pinId);
            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({ pinId });
            }
            await cart.save();
        } else {
            const newCart = new Cart({ userId: req.user._id, items: [{ pinId }] });
            await newCart.save();
        }
        res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
});

// Get cart items
router.get('/', isAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.pinId');
        res.status(200).json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});

export default router; // Use export default
