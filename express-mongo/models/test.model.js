var Promise = require('bluebird');
var mongoose = require('mongoose');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');

/**
 * Quersion Schema
 */
const TestSchema = new mongoose.Schema({
  //问题答案
  name:{
    type:String
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TestSchema.method({
});

/**
 * Statics
 */
TestSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      })
      .catch((err)=>{
        console.log(err);
      })
      ;
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Test
 */

module.exports = mongoose.model('Test', TestSchema);