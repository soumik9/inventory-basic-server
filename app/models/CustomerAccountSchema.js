import { Schema, Types, model } from "mongoose";
import moment from "moment";

const CustomerAccountSchema = new Schema({
    customer: {
        type: Types.ObjectId,
        ref: "Customer",
        required: [true, 'customer id is required']
    },
    balance: {
        type: Number,
        default: 0,
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

const CustomerAccount = model("CustomerAccount", CustomerAccountSchema);
export default CustomerAccount;