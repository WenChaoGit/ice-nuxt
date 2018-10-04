import axios from "axios";
axios.defaults.baseURL = 'https://api.weixin.qq.com/cgi-bin/';

const api = {
  accessToken:`token?grant_type=client_credential`
}


export default class Wechat {
  constructor(options){
    let {appID,appsecret } = options
    this.options = Object.assign({},options)
    this.appID = appID
    this.appSecret = appsecret
    this.getAccessToken = options.getAccessToken
    this.saveAccessToken = options.saveAccessToken
    this.fetchAccessToken()
  }

  async fetchAccessToken(){
    let data
    if(this.getAccessToken){
      data = await this.getAccessToken();//数据库中取
    }
    //从微信服务器取
    if(!this.isValidToken(data)){
      data = await this.updateAccessToken()
    }
    await this.saveAccessToken(data)
    return data
  }

  async updateAccessToken(){
    const url = `${api.accessToken}&appid=${this.appID}&secret=${this.appSecret}`
    const data = await this.request({url})
    const now = (new Date).getTime()
    const expires_in = now + (data.expires_in - 20)*1000
    data.expires_in = expires_in
    return data
  }


  isValidToken(data){
    if(!data || !data.access_token || !data.expires_in){
      return false
    }
    let expires_in = data.expires_in
    let now = new Date().getTime()
    return now < expires_in ? true : false;   
  }

  async request(options){
    try {
      let res = await axios.request(options)
      return res.data
    } catch (error) {
      console.log(err)
    }
  }

}