import httpStatus from "http-status";
import ApiError from "../../utils/errors/ApiError.js";
import { catchAsync, sendResponse } from "../../utils/helpers/global/index.js";
import { Customer, CustomerAccount, CustomerTransaction, Order } from "../models/index.js";
import { startSession } from "mongoose";
import { errorLogger } from "../../utils/helpers/logger/logger.js";
import { calculateTotal, generateUniqueOrderId } from "../services/OrderService.js";
import moment from "moment";

const CreateOrder = catchAsync(async (req, res) => {

    const body = req.body && req.body.data ? JSON.parse(req.body.data) : {};

    /* 
        1.generate order id 
        2. all products total (which is sub-total)
        3. if discount then minus from sub-total and assign to total
    */
    body.orderId = await generateUniqueOrderId(9);
    const total = calculateTotal(body.products);
    body.subTotal = total;
    body.total = total - (body.discount || 0);

    /* 
     1. credit amount to transaction
     2. debit amount to transaction
     3. the balance of user in account
    */
    const findCustomerAccount = await CustomerAccount.findOne({ customer: body.customer });;

    const transactionData = {
        customer: body.customer,
        credit: body.credit,
        debit: body.total - body.credit,
        balance: findCustomerAccount.balance - (body.total - body.credit), // if credit amount === total then no differenc is balance
    }

    // if the everything ok, process the transaction here
    const session = await startSession();

    try {
        session.startTransaction();

        // 1. create order
        const newOrder = await Order.create([body], { session });

        // 2. create transaction
        await CustomerTransaction.create([{ ...transactionData, order: newOrder[0]._id }], { session });

        // 3. update customer balance
        await CustomerAccount.updateOne({ customer: body.customer }, {
            $set: {
                balance: transactionData.balance,
                updatedAt: moment().unix()
            }
        }, { session, new: true, runValidators: true });

        // commit and end the transaction
        await session.commitTransaction();
        await session.endSession();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Order created successfully!`,
        });

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        errorLogger.error(`Transaction error: ${error.message}`);
        throw new ApiError(httpStatus.BAD_REQUEST, `Error on creating activity exists! ${error.message}`);
    }
})

export default {
    CreateOrder,
};