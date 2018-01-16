var Promise = require('bluebird');
var mongoose = require('mongoose');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');

/**
 * Quersion Schema
 */
const QuersionSchema = new mongoose.Schema({
  //序号
  Serial:{
    type:Number
  },
  //题目类型: 1:文字  2:图文
  Type:{
    type:Number
  },
  //问题内容
  Content:{
    type:String
  },
  //问题答案
  Answer:{
    type:String
  },
  Socre:{
    type:Number,
    default:0
  }
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
QuersionSchema.method({
});

/**
 * Statics
 */
QuersionSchema.statics = {
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
 * @typedef User
 */

module.exports = mongoose.model('Quersion', QuersionSchema);