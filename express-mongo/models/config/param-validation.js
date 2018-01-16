var Joi = require('joi');

var paramValidation =  {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^1[0-9]\d{9}$/).required()
    }
  },
  answerTheQuerstion:{
    body:{
      quersionlist:Joi.array().required(),
      answerlist:Joi.array().required(),
      mobileNumber: Joi.string().regex(/^1[0-9]\d{9}$/).required()
    }
  }
};


module.exports = paramValidation;