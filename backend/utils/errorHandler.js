class errorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    this.stack = new Error().stack;
  }
}
export default errorHandler;
