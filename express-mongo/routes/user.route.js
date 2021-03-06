var express = require('express');
var validate = require('express-validation');
// var paramValidation = require('../config/param-validation');
var userCtrl = require('../controllers/user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  // .get(userCtrl.list)

  /** POST /api/users - Create new user */
  // .post(validate(paramValidation.createUser), userCtrl.create);
  // .post(validate(paramValidation.createUser),userCtrl.create);
  .all(userCtrl.create);

// router.route('/getSMS')
//   .post(userCtrl.getSMS);

// router.route('/answerQuerstion')
//   .post(validate(paramValidation.answerTheQuerstion),userCtrl.answerTheQuerstion);

// router.route('/:userId')
//   /** GET /api/users/:userId - Get user */
//   .get(userCtrl.get)

//   /** PUT /api/users/:userId - Update user */
//   .put(validate(paramValidation.updateUser), userCtrl.update)

//   /** DELETE /api/users/:userId - Delete user */
//   .delete(userCtrl.remove);

// /** Load user when API with userId route parameter is hit */
// router.param('userId', userCtrl.load);


router.route('/getBoard')
  .post(userCtrl.getBoard);
module.exports = router;
