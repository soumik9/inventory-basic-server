import { Schema, Types, model } from "mongoose";
import moment from "moment";

const OrderSchema = new Schema({
    customer: {
        type: Types.ObjectId,
        ref: "Customer",
        required: [true, 'customer id is required']
    },
    reference: {
        type: Types.ObjectId,
        ref: "Employee",
    },
    orderId: {
        type: String,
        required: [true, 'Order is required'],
    },
    status: {
        type: Boolean,
        default: false,
    },
    products: [{
        name: {
            type: String,
            required: [true, 'Product is required'],
        },
        price: {
            type: Number,
            required: [true, 'Product price required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity required'],
        },
    }],
    discount: {
        type: Number,
        required: [true, 'Total is required'],
    },
    subTotal: {
        type: Number,
        required: [true, 'Total is required'],
    },
    total: {
        type: Number,
        required: [true, 'Total is required'],
    },
    createdAt: {
        type: Number,
        default: () => moment().unix(),
    },
    updatedAt: {
        type: Number,
        default: () => moment().unix(),
    },
});

const Order = model("Order", OrderSchema);
export default Order;