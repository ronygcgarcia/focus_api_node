export default class BaseError extends Error {
  constructor(public name: string,
    public statusCode: number,
    public description: string,
    public isOperational: boolean = false) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.description = description;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}
