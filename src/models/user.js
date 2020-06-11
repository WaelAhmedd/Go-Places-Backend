const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        trim:true

    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        trim:true,
        required:true
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Account'
         
    }

},{
    timestamps:true
})

const User = mongoose.model('User', userSchema)

module.exports = User