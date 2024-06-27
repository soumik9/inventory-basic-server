import { Schema, model } from "mongoose";
import moment from "moment";

const EmployeeSchema = new Schema({
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
    createdAt: {
        type: Number,
        default: () => moment().unix(),
    },
    updatedAt: {
        type: Number,
        default: () => moment().unix(),
    },
});

const Employee = model("Employee", EmployeeSchema);
export default Employee;