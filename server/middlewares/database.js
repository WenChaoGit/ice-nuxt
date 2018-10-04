import mongoose from 'mongoose';
import config from '../config'
import { resolve } from "path";
import glob from "glob";
glob.sync(resolve(__dirname,'../database/schema','**/*.js')).forEach(require)

export const database = app => {
    mongoose.set('debug',true)
    mongoose.connect(config.db)
    mongoose.connection.on('disconnected', () => {
        mongoose.connect(config.db)
    })
    mongoose.connection.on('error',(error) =>{
        console.log(error)
    })

    mongoose.connection.on('open',async ()=>{
        console.log('open')
    })
}