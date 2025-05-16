export class RequestError extends Error {
    statusCode: number;
    errors?: Record<string, string[]>;

    constructor(
        statusCode: number,
        message: string,
        errors?: Record<string, string[]>
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = "RequestError";
    }
}

export class ValidationError extends RequestError {
    constructor(fieldErrors: Record<string, string[]>) {
        const message = ValidationError.formatFieldErrors(fieldErrors);
        super(400, message, fieldErrors);
        this.name = "ValidationError";
    }

    static formatFieldErrors(errors: Record<string, string[]>): string {
        const formattedMessages = Object.entries(errors).map(
            ([field, messages]) => {
                const fieldName =
                    field.charAt(0).toUpperCase() + field.slice(1);
                if (messages[0] === "Required") {
                    return `${fieldName} is required`;
                } else {
                    return messages.join(" and ");
                }
            }
        );
        return formattedMessages.join(", ");
    }
}

export class NotFoundError extends RequestError {
    constructor(resource: string) {
        super(404, `${resource} not found`);
        this.name = "NotFoundError";
    }
}

export class ForbiddenError extends RequestError {
    constructor(message: string = "Forbidden") {
        super(403, message);
        this.name = "ForbiddenError";
    }
}

export class UnauthorizedError extends RequestError {
    constructor(message: string = "Unauthorized") {
        super(401, message);
        this.name = "UnauthorizedError";
    }
}

//* BELOW IS THE SAME BUT WRITTEN WITH ARROW FUNCTIONS (for reference)
// type ErrorWithStatus = Error & {
//     statusCode: number;
//     errors?: Record<string, string[]>;
//     name: string;
//   };

//   export const createRequestError = (
//     statusCode: number,
//     message: string,
//     errors?: Record<string, string[]>
//   ): ErrorWithStatus => {
//     const error = new Error(message) as ErrorWithStatus;
//     error.statusCode = statusCode;
//     error.errors = errors;
//     error.name = "RequestError";
//     return error;
//   };

//   const formatFieldErrors = (errors: Record<string, string[]>): string => {
//     const formattedMessages = Object.entries(errors).map(
//       ([field, messages]) => {
//         const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
//         if (messages[0] === "Required") {
//           return `${fieldName} is required`;
//         } else {
//           return messages.join(" and ");
//         }
//       }
//     );
//     return formattedMessages.join(", ");
//   };

//   export const createValidationError = (fieldErrors: Record<string, string[]>): ErrorWithStatus => {
//     const message = formatFieldErrors(fieldErrors);
//     const error = createRequestError(400, message, fieldErrors);
//     error.name = "ValidationError";
//     return error;
//   };

//   export const createNotFoundError = (resource: string): ErrorWithStatus => {
//     const error = createRequestError(404, `${resource} not found`);
//     error.name = "NotFoundError";
//     return error;
//   };

//   export const createForbiddenError = (message: string = "Forbidden"): ErrorWithStatus => {
//     const error = createRequestError(403, message);
//     error.name = "ForbiddenError";
//     return error;
//   };

//   export const createUnauthorizedError = (message: string = "Unauthorized"): ErrorWithStatus => {
//     const error = createRequestError(401, message);
//     error.name = "UnauthorizedError";
//     return error;
//   };
