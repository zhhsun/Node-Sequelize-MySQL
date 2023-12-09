'use strict';

class BaseException {
  /**
   *
   */
  constructor(code, message) {
    this._code = code;
    this._message = message;
  }

  get code() {
    return this._code;
  }

  get message() {
    return this._message;
  }
}

module.exports = BaseException;


