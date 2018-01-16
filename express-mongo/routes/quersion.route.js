var express = require('express');
var quersionCtrl = require('../controllers/quersion.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(quersionCtrl.create);

router.route('/getList')
.post(quersionCtrl.getList);

module.exports = router;
