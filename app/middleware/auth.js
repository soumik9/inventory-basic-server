import ApiError from "../../utils/errors/ApiError.js";
import httpStatus from "http-status";
import { verifyToken } from "../../utils/helpers/jwt/index.js";
import { config } from "../../utils/server/index.js";
import { Admin } from "../models/index.js";

export default () => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');

        // getting token
        const token = authHeader.split(' ')[1];

        // verify token
        let verifiedUser = null;
        verifiedUser = verifyToken(token, config.TOKEN_SECRET);

        // is admin exists
        const findAdmin = await Admin.findOne({ _id: verifiedUser._id }).lean();
        if (!findAdmin)
            throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');

        req.user = verifiedUser; // _id
        next();
    } catch (error) {
        next(error);
    }
}