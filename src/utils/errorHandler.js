/**
 * Error Handler Utility
 * Centralized error handling for the application
 */

class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Predefined Errors
const ERRORS = {
    UNAUTHORIZED: new AppError("Unauthorized access", 401),
    FORBIDDEN: new AppError("Access denied", 403),
    NOT_FOUND: new AppError("Resource not found", 404),
    VALIDATION_ERROR: (msg) => new AppError(msg, 400),
    SERVER_ERROR: new AppError("Internal server error", 500),
};

/**
 * Handle errors in async/await routes
 * Usage: catchAsync(async (req, res) => { ... })
 */
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Global error handler middleware
 * Should be used as the last middleware in Express
 */
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong!";

    // Log error in development
    if (process.env.NODE_ENV !== "production") {
        console.error("❌ Error:", err);
    }

    // Wrong MongoDB ID error
    if (err.name === "CastError") {
        const message = `Resource not found`;
        err = new AppError(message, 400);
    }

    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        err = new AppError(message, 400);
    }

    // JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid token`;
        err = new AppError(message, 401);
    }

    // JWT expired error
    if (err.name === "TokenExpiredError") {
        const message = `Token expired`;
        err = new AppError(message, 401);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

module.exports = {
    AppError,
    ERRORS,
    catchAsync,
    globalErrorHandler,
};