


function RetBase(status = 200,msg = '',data = {}){
  var retData = {
    status:status,
    msg:msg,
    data:data
  }
  return retData;
}


module.exports = RetBase;
