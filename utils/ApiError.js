class ApiError {
  constructor(statusCode, errors, message = "Error Occured") {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors || null;
    this.success = false;
  }
}
module.exports = { ApiError };
