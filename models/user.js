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
    // check if this is uniqe
    userName:{
        type:String,
        required:false,
        trim:true,
        unique:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
        
    },
    location:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        required:false,
        trim:true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User