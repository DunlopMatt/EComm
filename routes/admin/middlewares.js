const { validationResult } = require('express-validator');

module.exports = {
  handleErrors(dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        let data = {};
        if(dataCb) {
          data = await dataCb(req);
        }
        return res.send({ errors, ...data });
      }

      next();
    };
  },
  requireAuth(req, res, next) {
    if(!req.headers.authorization) {
      throw Error ("Auth Required")
    }
    next();
  }
};
