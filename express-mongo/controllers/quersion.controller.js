var Quersion = require('../models/quersion.model');
var User = require('../models/user.model');

var RetBase = require('../helpers/baseHelper');

/**
 * 新建问题
 * @api {POST} /api/users/:id 新建问题2
 * @apiDescription 根据ID获得某个用户
 * @apiName getUser
 * @apiParam (path参数) {Number} id
 * @apiSampleRequest /api/users/5a45cefd080d7c39a036ca55
 * @apiGroup User
 * @apiVersion 1.0.0
 */
function create(req, res, next) {
  // res.json({msg:'无权限'});
  const user = new Quersion({
    Serial: req.body.Serial,
    Type: req.body.Type,
    Content: req.body.Content,
    Answer: req.body.Answer,
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}


function getList(req, res, next) {
  const { total = 50, part = 15,mobileNumber='' } = req.body;//获取题目序号最大值，取题数量
  console.log('aaaaa');
  User.findOne(
    {mobileNumber:mobileNumber}
  )
  .then(user =>{
    if(user.UseTime < 0){
      let Serials = getSerials(1,50,part);//获取随机题目序号
      console.log('生成的题号：'+Serials);
      Quersion.find({Serial:{$in:Serials}},{ _id:1,Content:1 })
      .then(qs => {
        var _rlt = {
          num:qs.length,
          lists:qs
        };

        User.update({mobileNumber:mobileNumber},{$set:{getQListTime:new Date(),quersionList:qs}})
        .then(rlt=>{
          res.json(RetBase(200,'查询成功!',_rlt));
        })
        .catch(e=>{
          res.json(RetBase(201,'201003',e));
        })
        
      })
      .catch(e => res.json(RetBase(201,'201002',e)));
    }else{
      res.json(RetBase(201,'已答题！',null));
    }
  })
  .catch(e =>{
    res.json(RetBase(201,'201003',e));
  })





}


function getSerials(beginNum,endNum,len){
  var sub_arr = new Array();//生成的随机数数组  
  var has_arr = new Array();//稀疏数组，判断该数字是否已经选出  
  var temp = '';  
  for (var i = 1; i <=len; i++) {  
      do {  
          temp = getRandomNum(beginNum, endNum);  
      } while (has_arr[temp] !== undefined)//判断该选出的数字是否已经选出  
      has_arr[temp] = 'has';//该数字作为偏移量，加入稀疏数组记录为已选  
      sub_arr[i-1] = temp;  
  }  
  return sub_arr.sort(function (a, b) {  
      return a - b;  
  });//升序排列  
}

function getRandomNum(min, max) {//生成一个随机数从[min,max]  
  return min + Math.round(Math.random() * (max - min));  
}



module.exports =  { create,getList };
