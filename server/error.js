class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class NotFoundError extends CustomError {}
class BadRequestError extends CustomError {}

module.exports = {
  NotFoundError,
  BadRequestError
};