var Promise = require('bluebird');
var mongoose = require('mongoose');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username:{
    type:String
  },
  mobileNumber:{
    type:String
  },
  quersionList:{
    type:Array,
    default:[]
  },
  answerList:{
    type:Array,
    default:[]
  },
  mark:{
    type:Number,
    default:-1
  },
  UseTime:{
    type:Number,
    default:-1
  },
  getQListTime:{
    type:Date
  },
  postAListTime:{
    type:Date
  },
  createdAt:{
    type:Date,
    default:Date.now
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
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    console.log('UserSchema get()'+id)
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

module.exports = mongoose.model('User', UserSchema);