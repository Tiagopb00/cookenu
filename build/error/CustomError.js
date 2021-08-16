"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
class NotFoundError extends CustomError {
    constructor() {
        super("Recurso não encontrado", 404);
    }
}
exports.NotFoundError = NotFoundError;
