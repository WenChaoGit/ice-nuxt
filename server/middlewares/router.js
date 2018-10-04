
import Router from "koa-router";
import sha1 from "sha1";
import config from "../config";
export const route = app => {
  const router = new Router()
  router.get('/wechat-hear', (ctx,next) => {
    require('../wechat')
    const {signature,nonce,echostr,timestamp} = ctx.query
    let token = config.wechat.token;
    let str = [token,timestamp,nonce].sort().join('')
    const sha = sha1(str)
    if(sha === signature){
      ctx.body = echostr
    }else{
      ctx.body = 'fail'
    }
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())
}