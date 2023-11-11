'use strict';

const Exceptions = require("../exceptions");

module.exports = {
  /**
   *
   */
  parseException: (res, err) => {
    if (err instanceof Exceptions.BadInputException) {
      res.status(400).send(err);
    } if (err instanceof Exceptions.EntityNotFoundException) {
      res.status(404).send(err)
    } else {
      res.status(500).send(err);
    }
  }
};
