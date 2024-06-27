import { Schema, Types, model } from "mongoose";
import moment from "moment";

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    address: {
        type: String,
        required: [true, 'address is required'],
    },
    account: {
        type: Types.ObjectId,
        ref: "CustomerAccount",
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

const Customer = model("Customer", CustomerSchema);
export default Customer;