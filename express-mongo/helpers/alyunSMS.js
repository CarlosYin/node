/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */

const SMSClient = require('aliyun-dysms-sdk')

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAINHLeEk8BCMfV'
const secretAccessKey = 'XYlr75uB11iDFCNwdq9CBdDi5eSn7E'

//在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
const queueName = 'Alicom-Queue-1092397003988387-'

//初始化sms_client
const smsClient = new SMSClient({accessKeyId, secretAccessKey})

// //短信回执报告
// smsClient.receiveMsg(0, queueName).then(function (res) {
//     //消息体需要base64解码
//     let {code, body}=res
//     if (code === 200) {
//         //处理消息体,messagebody
//         console.log(body)
//     }
// }, function (err) {
//     console.log(err)
// })

// //短信上行报告
// smsClient.receiveMsg(1, queueName).then(function (res) {
//     //消息体需要base64解码
//     let {code, body}=res
//     if (code === 200) {
//         //处理消息体,messagebody
//         console.log(body)
//     }
// }, function (err) {
//     console.log(err)
// })


// //查询短信发送详情
// smsClient.queryDetail({
//     PhoneNumber: '1500000000',
//     SendDate: '20170731',
//     PageSize: '10',
//     CurrentPage: "1"
// }).then(function (res) {
//     let {Code, SmsSendDetailDTOs}=res
//     if (Code === 'OK') {
//         //处理发送详情内容
//         console.log(SmsSendDetailDTOs)
//     }
// }, function (err) {
//     //处理错误
//     console.log(err)
// })

// //发送短信
// smsClient.sendSMS({
//     PhoneNumbers: '1500000000',
//     SignName: '云通信产品',
//     TemplateCode: 'SMS_000000',
//     TemplateParam: '{"code":"12345","product":"云通信"}'
// }).then(function (res) {
//     let {Code}=res
//     if (Code === 'OK') {
//         //处理返回参数
//         console.log(res)
//     }
// }, function (err) {
//     console.log(err)
// })


module.exports = smsClient;
