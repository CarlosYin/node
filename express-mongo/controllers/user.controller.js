var User = require('../models/user.model');
var Quersion = require('../models/quersion.model');


var RetBase = require('../helpers/baseHelper');

var smsClient = require('../helpers/alyunSMS');

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
 const {username ='',mobileNumber=''} = req.body;
  User.find({mobileNumber:mobileNumber})//是否已存在的手机
  .then(users =>{
    if(users.length>0){
      let _user = users[0];
      let _mark = parseInt(_user.mark);
      if(_mark > 0){//是否已答题的手机
        res.json(RetBase(203,'已答题!',users[0]));
      }else res.json(RetBase(200,'登录成功!',users[0]));
    }else{
      const user = new User({
        username: username,
        mobileNumber: mobileNumber
      });
      user.save()
      .then(savedUser => res.json(RetBase(200,'注册成功!',savedUser)))
      .catch(e => res.json(RetBase(201,'201001',e)));
    }
  })
  .catch(e => res.json(RetBase(201,'201002',e)));
}

function getSMS(req, res, next){
  console.log('getSMS');
  smsClient.sendSMS({
    PhoneNumbers: '15685416667',
    SignName: 'h5答题太阳在线',
    TemplateCode: 'SMS_113970049',
    TemplateParam: '{"code":"1234"}'
  }).then(function (res) {
      let {Code}=res
      if (Code === 'OK') {
          //处理返回参数
          console.log(res)
      }
  }, function (err) {
      console.log(err)
  })
}


function answerTheQuerstion(req,res,next){
  console.log('PostAnswer');

  const {mobileNumber = '',quersionlist=new Array(),answerlist=new Array()} = req.body;
  console.log(mobileNumber);
  console.log(quersionlist);
  console.log(answerlist);


  //计算分数
  score(req,res,next);


}


function score(req,res,next){
  const {mobileNumber = '',quersionlist=new Array(),answerlist=new Array()} = req.body;
  if(quersionlist.length ==0 || quersionlist.length != answerlist.length){
    res.json(RetBase(400,'答案与题目数量不符!',null));
  }else{
    let _mark = 0;
    
    Quersion.find({_id:{$in:quersionlist}},{Answer:1,Socre:1})
    .then(aws =>{
      for(let i=0;i<aws.length;i++){
        let _r_answer = aws[i].Answer || -1;
        let _u_answer = answerlist[i] || -2;
        // let _r_socre = aws[i].Socre || 0;
        let _r_socre = 10;


        if(_r_answer == _u_answer)_mark +=_r_socre;
        
      }
      User.findOne(
        {mobileNumber:mobileNumber}
      )
      .then(user =>{
        if(!user){
          res.json(RetBase(400,'非法用户!',null));
          return;
        }
        if(user.mark >=0){
          res.json(RetBase(400,'已答题!',user));
          return;
        }

        console.log('aaaaa',user,user.quersionList.length)
        if(user.quersionList.length <=0){
          res.json(RetBase(400,'非法答题!',null));
          return;
        }

        let _postDate = new Date();
        let _useTime = getUseTime(user.getQListTime,_postDate);
        console.log('_useTime:',_useTime);
        User.update(
          {mobileNumber:mobileNumber},
          {$set: {
              quersionList: quersionlist,
              answerList:answerlist,
              mark:_mark,
              UseTime:_useTime,
              postAListTime:_postDate
            }
          }
        )
        .then(rlt=>{
          if(rlt.ok == 1){
            user.mark = _mark;
            user.UseTime =_useTime;
            res.json(RetBase(200,'答题成功!',user));
          }else{
            res.json(RetBase(400,'答题失败!',null));
          }
        })
        .catch(e =>{
          res.json(RetBase(400,'答题失败!',e));
        })
      })
    })
    .catch(e =>{
      res.json(RetBase(400,'答题失败!',e));
    })
  }
}

function getUseTime(oDate=new Date(),nDate=new Date()){
  let p = nDate - oDate;
  return Math.ceil((p/1000));
}


function getBoard(req,res,next){

  console.log('getBoard')
  const {pageIndex = 1,pageSize = 5} = req.body;
  let _skip = (pageIndex -1) *pageSize;
  _skip = parseInt(_skip);
  let _psize = parseInt(pageSize);
  User.find({UseTime:{$gt:-1}},{_id:0,username:1,mobileNumber:1,UseTime:1,mark:1})
  .sort({mark:-1,UseTime:1})
  .skip(_skip)
  .limit(_psize  )
    .then(rlt =>{
      rlt.forEach(e=>{
        let phone =e.mobileNumber;
        phone =  phone.substring(0,3)+'****'+ phone.substring(7);
        e.mobileNumber =phone;
      })
      console.log('getBoard rlt',rlt);
      res.json(RetBase(200,'查询成功!',rlt));
    })
    .catch(e =>{
      res.json(RetBase(400,'查询失败!',e));
    })

}




// function getLastBoard(req,res,next){
//     const {pageIndex = 1,pageSize = 5} = req.body;
//     let _skip = (pageIndex -1) *pageSize;
//     _skip = parseInt(_skip);
//     let _psize = parseInt(pageSize);
//     User.find({UseTime:{$gt:-1}},{_id:0,username:1,mobileNumber:1,UseTime:1,mark:1})
//     .sort({mark:-1,UseTime:1})
//     .skip(0)
//     .limit(500)
//       .then(rlt =>{
//         // rlt.forEach(e=>{
//         //   let phone =e.mobileNumber;
//         //   phone =  phone.substring(0,3)+'****'+ phone.substring(7);
//         //   e.mobileNumber =phone;
//         // })
//         console.log('getBoard rlt',rlt);
//         res.json(RetBase(200,'查询成功!',rlt));
//       })
//       .catch(e =>{
//         res.json(RetBase(400,'查询失败!',e));
//       })
  
//   }

 




// function getBoard(req,res,next){
  
//     console.log('getBoard')
//     const {pageIndex = 1,pageSize = 5} = req.body;
  
//     let _skip = (pageIndex -1) *pageSize;
//     console.log(pageIndex,_skip,pageSize)
  
//     User.find({UseTime:{$gt:-1}},{_id:0,username:1,mobileNumber:1,UseTime:1,mark:1})
//     .sort({mark:-1,UseTime:1})
//     .skip(_skip)
//     .limit(pageSize)
//       .then(rlt =>{
//         console.log('getBoard rlt',rlt);
//         res.json(RetBase(200,'查询成功!',rlt));
//       })
//       .catch(e =>{
//         res.json(RetBase(400,'查询失败!',e));
//       })
  
//   }

module.exports =  { create,answerTheQuerstion,getBoard };
