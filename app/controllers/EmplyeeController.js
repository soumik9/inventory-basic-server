import httpStatus from "http-status";
import ApiError from "../../utils/errors/ApiError.js";
import { catchAsync, sendResponse } from "../../utils/helpers/global/index.js";
import { Employee } from "../models/index.js";

const CreateEmployee = catchAsync(async (req, res) => {

    const body = req.body && req.body.data ? JSON.parse(req.body.data) : {};

    // is Employee exists
    const findEmployee = await Employee.findOne({ phone: body.phone });
    if (findEmployee)
        throw new ApiError(httpStatus.CONFLICT, 'Employee with this number already exists.');

    // creating employee
    const data = await Employee.create(body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Employee created successfully!`,
        data,
    });

})

const GetAllEmployees = catchAsync(async (req, res) => {

    const data = await Employee.find().select("-__v");

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Employees retrived successfully!`,
        meta: {
            total: data.length,
        },
        data,
    });

})

export default {
    CreateEmployee,
    GetAllEmployees,
};