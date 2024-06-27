import httpStatus from "http-status";
import ApiError from "../../utils/errors/ApiError.js";
import { catchAsync, sendResponse } from "../../utils/helpers/global/index.js";
import { Customer, CustomerAccount } from "../models/index.js";
import { startSession } from "mongoose";
import { errorLogger } from "../../utils/helpers/logger/logger.js";

const CreateCustomer = catchAsync(async (req, res) => {

    const body = req.body && req.body.data ? JSON.parse(req.body.data) : {};

    // is customer exists
    const findCustomer = await Customer.findOne({ phone: body.phone });
    if (findCustomer)
        throw new ApiError(httpStatus.CONFLICT, 'Customer with this number already exists.');

    // if the everything ok, process the transaction here
    const session = await startSession();

    try {
        session.startTransaction();

        // 1. creating customer
        const newCustomer = await Customer.create([body], { session });

        // 2. creating customer account
        const newCustomerAccount = await CustomerAccount.create([{ customer: newCustomer[0]._id }], { session });

        // 3. updating account number of customer
        newCustomer[0].account = newCustomerAccount[0]._id;
        await newCustomer[0].save({ session });

        // commit and end the transaction
        await session.commitTransaction();
        await session.endSession();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Customer created successfully!`,
            data: newCustomer,
        });

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        errorLogger.error(`Transaction error: ${error.message}`);
        throw new ApiError(httpStatus.BAD_REQUEST, `Error on creating activity exists! ${error.message}`);
    }
})

const GetAllCustomers = catchAsync(async (req, res) => {

    const data = await Customer.find().select("-__v");

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Customers retrived successfully!`,
        meta: {
            total: data.length,
        },
        data,
    });

})

export default {
    CreateCustomer,
    GetAllCustomers,
};