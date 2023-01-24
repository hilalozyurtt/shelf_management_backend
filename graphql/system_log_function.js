const SystemLog = require("../models/System_log")
const cookie = require('cookie');
const jwt = require('jsonwebtoken')

const createLog = async (reqHeaders, action, changed_id, changed_value )=>{
  if(reqHeaders.cookie){
    const cookies = cookie.parse(reqHeaders.cookie)
    if(cookies.token != ""){
      const user = jwt.verify(cookies.token, "UNSAFE_STRING")
      await SystemLog.create({
        action: action,
        changed_id: changed_id,
        changed_value: changed_value,
        created_at: new Date(),
        user_id: user.user_id,
        user_name: user.username
      })
    }
  }else{
    //giriş yapılmamış
  }
}
module.exports = createLog