import { Schema, model } from "mongoose";
import moment from "moment";
import { hashString } from "../../utils/helpers/bcrypt/index.js";
import { config } from "../../utils/server/index.js";

const AdminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        default: 'admin',
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

// create or save works for both
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const password = this.password;
    const hashedPassword = await hashString(password, Number(config.BCRYPT_SALT_ROUND));

    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
});

const Admin = model("Admin", AdminSchema);
export default Admin;