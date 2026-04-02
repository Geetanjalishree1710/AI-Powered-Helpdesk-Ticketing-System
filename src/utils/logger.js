/**
 * Logger Utility
 * Provides consistent logging across the application
 */

const LOG_LEVELS = {
    ERROR: "❌",
    WARN: "⚠️",
    INFO: "ℹ️",
    DEBUG: "🔍",
    SUCCESS: "✅",
};

class Logger {
    constructor(prefix = "APP") {
        this.prefix = prefix;
        this.isDevelopment = process.env.NODE_ENV !== "production";
    }

    formatMessage(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const emoji = LOG_LEVELS[level] || "📝";
        const prefix = `[${this.prefix}]`;
        const msg = `${emoji} ${prefix} [${timestamp}] ${message}`;

        if (data) {
            return `${msg}\n${JSON.stringify(data, null, 2)}`;
        }
        return msg;
    }

    error(message, error = null) {
        const msg = this.formatMessage("ERROR", message, error);
        console.error(msg);
    }

    warn(message, data = null) {
        if (this.isDevelopment) {
            const msg = this.formatMessage("WARN", message, data);
            console.warn(msg);
        }
    }

    info(message, data = null) {
        if (this.isDevelopment) {
            const msg = this.formatMessage("INFO", message, data);
            console.info(msg);
        }
    }

    debug(message, data = null) {
        if (this.isDevelopment) {
            const msg = this.formatMessage("DEBUG", message, data);
            console.log(msg);
        }
    }

    success(message, data = null) {
        if (this.isDevelopment) {
            const msg = this.formatMessage("SUCCESS", message, data);
            console.log(msg);
        }
    }
}

// Create default logger instance
const logger = new Logger("HELPDESK");

module.exports = Logger;
module.exports.logger = logger;