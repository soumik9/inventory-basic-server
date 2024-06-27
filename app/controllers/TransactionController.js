import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils/helpers/global/index.js";
import { CustomerTransaction } from "../models/index.js";

const GetAllTransactionByCustomerId = catchAsync(async (req, res) => {

    const { customerId } = req.params;
    const data = await CustomerTransaction.find({ customer: customerId }).sort({ createdAt: -1 });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Transactions retrived successfully!`,
        meta: {
            total: data.length,
        },
        data,
    });

})

export default {
    GetAllTransactionByCustomerId,
};