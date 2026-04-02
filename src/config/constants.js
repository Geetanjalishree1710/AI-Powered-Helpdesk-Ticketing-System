/**
 * Application Constants
 * Centralized configuration values used throughout the application
 */

const CONSTANTS = {
    // HTTP Status Codes
    HTTP: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        SERVER_ERROR: 500,
    },

    // User Roles
    ROLES: {
        USER: "user",
        ADMIN: "admin",
    },

    // Ticket Status
    TICKET_STATUS: {
        OPEN: "Open",
        IN_PROGRESS: "In Progress",
        RESOLVED: "Resolved",
        CLOSED: "Closed",
    },

    // Ticket Priority
    TICKET_PRIORITY: {
        LOW: "Low",
        MEDIUM: "Medium",
        HIGH: "High",
        CRITICAL: "Critical",
    },

    // Messages
    MESSAGES: {
        // Authentication
        AUTH_SUCCESS: "Authentication successful",
        AUTH_FAILED: "Authentication failed",
        USER_NOT_FOUND: "User not found",
        INVALID_PASSWORD: "Invalid password",

        // Tickets
        TICKET_CREATED: "Ticket created successfully",
        TICKET_UPDATED: "Ticket updated successfully",
        TICKET_RESOLVED: "Ticket resolved successfully",
        TICKET_NOT_FOUND: "Ticket not found",

        // Authorization
        ACCESS_DENIED: "Access denied",
        UNAUTHORIZED: "Unauthorized access",

        // Server
        SERVER_ERROR: "Internal server error",
        INVALID_REQUEST: "Invalid request",
    },

    // Validation
    VALIDATION: {
        MIN_PASSWORD_LENGTH: 6,
        MAX_PASSWORD_LENGTH: 128,
        MIN_EMAIL_LENGTH: 5,
        MAX_EMAIL_LENGTH: 255,
        MIN_NAME_LENGTH: 2,
        MAX_NAME_LENGTH: 100,
    },

    // Pagination
    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 10,
        MAX_LIMIT: 100,
    },

    // Cache
    CACHE: {
        TICKET_TTL: 300, // 5 minutes
        USER_TTL: 600, // 10 minutes
    },
};

module.exports = CONSTANTS;