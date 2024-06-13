import config from '../server/config.js';
import ApiError from './ApiError.js';
import handleValidationError from './handleValidationError.js';
import handleCastError from './handleCastError.js';
import { ZodError } from 'zod';
import handleZodError from './handleZodError.js';
import { MulterError } from 'multer';
import httpStatus from 'http-status';

const globalErrorHandler = (error, req, res, next) => {

    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];

    if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof MulterError) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.ENV !== 'production' ? error?.stack : undefined,
    });
};

export default globalErrorHandler;