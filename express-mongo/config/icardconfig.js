const sucCode = 200;

const constant = {
    RETCODE: {
        USER: {
            hasPhone: {
                code: 2003,
                msg: '已存在的手机号！'
            },
            registSuc: {
                code:sucCode,
                msg: '注册成功!'
            },

            registErr: {
                code:2004,
                msg: '注册失败!'
            },
        }
    }
}

module.exports = constant;
