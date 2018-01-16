var Test = require('../models/test.model');

var RetBase = require('../helpers/baseHelper');


/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function getData(req, res, next) {
  Test.find().then(res=>{
    console.log(res)
  })
}

function add(req, res, next) {
  // res.json({msg:'无权限'});
  const t = new Test({
    name:'abdd'
  });

  t.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}






module.exports =  { getData,add };
