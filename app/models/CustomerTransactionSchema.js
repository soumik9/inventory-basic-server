import { Schema, Types, model } from "mongoose";
import moment from "moment";

const CustomerTransactionSchema = new Schema({
    customer: {
        type: Types.ObjectId,
        ref: "Customer",
        required: [true, 'customer id is required']
    },
    order: {
        type: Types.ObjectId,
        ref: "Order",
    },
    credit: {
        type: Number,
        required: [true, 'Cash is required'],
    },
    debit: {
        type: Number,
        required: [true, 'Due is required'],
    },
    balance: {
        type: Number,
        required: [true, 'Transaction balance is required'],
    },
    method: {
        type: String,
        default: "cash"
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

// Pre-save hook to enforce conditional requirement
CustomerTransactionSchema.pre('save', function (next) {
    if (this.type === "Order" && !this.order) {
        return next(new Error('Order id is required when type is "Order"'));
    }
    next();
});

const CustomerTransaction = model("CustomerTransaction", CustomerTransactionSchema);
export default CustomerTransaction;