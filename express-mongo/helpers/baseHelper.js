


function RetBase(ret = { code: 200, msg: '' }, data = {}) {
  var retData = {
    code: ret.code,
    msg: ret.msg,
    data: data
  }
  return retData;
}

module.exports = RetBase;
