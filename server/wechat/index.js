import mongoose from "mongoose";
import config from "../config";

import Wechat  from '../libs/wechat'
const Token = mongoose.model('Token')
let wxconfig = Object.assign({},config.wechat,{
  getAccessToken:async ()=> await Token.getAccessToken(),
  saveAccessToken: async (data) => await Token.saveAccessToken(data)
})

export const getWechat = () => {
  const wechat  = new Wechat(wxconfig)
  return wechat
}

getWechat()

