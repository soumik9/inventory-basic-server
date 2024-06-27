import httpStatus from "http-status";
import ApiError from "../../utils/errors/ApiError.js";
import { catchAsync, sendResponse } from "../../utils/helpers/global/index.js";
import { compareString } from "../../utils/helpers/bcrypt/index.js";
import { generateToken } from "../../utils/helpers/jwt/index.js";
import { Admin } from "../models/index.js";

// admin signin controller
const Signin = catchAsync(async (req, res) => {

    // parsing data
    const body = req.body && req.body.data ? JSON.parse(req.body.data) : {};

    // is admin exists
    const findAdmin = await Admin.findOne({ phone: body.phone }).lean();
    if (!findAdmin)
        throw new ApiError(httpStatus.NOT_FOUND, 'You are not authorized.');

    // checking is valid password
    const isValidPassword = await compareString(body.password, findAdmin.password);
    if (!isValidPassword)
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Credential mismatch!');

    // generating token
    const token = generateToken(findAdmin);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login Success!',
        data: {
            accessToken: token,
            _id: findAdmin._id,
            name: findAdmin.name,
            phone: findAdmin.phone,
        },
    });
}
)

// profile of logged User
const Profile = catchAsync(
    async (req, res) => {

        // finding profile data
        const data = await Admin.findById(req.user?._id).select("-password");

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Profile retrieved successfully!',
            data,
        });
    }
)

export default {
    Signin,
    Profile,
};