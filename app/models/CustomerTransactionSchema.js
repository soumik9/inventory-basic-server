import { Schema, Types, model } from "mongoose";
import moment from "moment";

const CustomerTransactionSchema = new Schema({
    customer: {
        type: Types.ObjectId,
        ref: "Customer",
        required: [true, 'customer id is required']
    },
    cash: {
        type: Number,
        required: [true, 'Cash is required'],
    },
    due: {
        type: Number,
        required: [true, 'Due is required'],
    },
    total: {
        type: Number,
        required: [true, 'Total is required'],
    },
    type: {
        type: String,
        default: "Order"
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

const CustomerTransaction = model("CustomerTransaction", CustomerTransactionSchema);
export default CustomerTransaction;