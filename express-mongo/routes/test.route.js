var express = require('express');
var testCtrl = require('../controllers/test.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .all(testCtrl.getData);

router.route('/addone')
.all(testCtrl.add);

module.exports = router;
