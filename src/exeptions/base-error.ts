import { ApiError } from "@/types/api-error";

export class BaseError extends Error implements ApiError {
  message: string = "";

  constructor(message: string) {
    super(message);
    this.message = message;
  }

  toPlainObject(): ApiError {
    return {
      message: this.message,
    };
  }
}
