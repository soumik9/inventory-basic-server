import { Order } from "../models/index.js";

export const calculateTotal = (products) => {
    return products.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
}

export const generateUniqueOrderId = async (length) => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    let isUnique = false;
    while (!isUnique) {
        code = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        // Check if the code already exists in the database
        const existingCode = await Order.findOne({ orderId: code });
        if (!existingCode) {
            isUnique = true;
        }
    }
    return code;
}