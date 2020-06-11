const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const accountSchema=new mongoose.Schema({
  
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
    tokens:[{
        token:{
        type:String,
        required:true}
    }]
},{
    timestamps:true
})
accountSchema.methods.generateAuthToken = async function () {
    const account = this
    const token = jwt.sign({ _id: account._id.toString() }, 'this-is-new-token')

    account.tokens = account.tokens.concat({ token })
   
    await account.save()
  

    return token
}


accountSchema.methods.toJSON=function(){
    const account = this
    const accountObject= account.toObject()
    //delete accountObject.password
    delete accountObject._id
    delete accountObject.tokens
    return accountObject
}

accountSchema.statics.findByCredentials= async (email,password)=>{
 
    const account = await Account.findOne({email})
    if(!account){
        console.log('ml2tosh')
        throw new Error('Email does not exist')
    }
    console.log('la2eto')

    //fe error fl validate password

   /*const isMatch =await bcrypt.compare(password,account.password)
    if(!isMatch){
        throw new Error('unable to login')
    }*/

    return account
}

accountSchema.pre('save',async function(next){
    const account=this

    if(account.isModified('password')){
        account.password=await bcrypt.hash(account.password,8)
    }
    next()
})

const Account = mongoose.model('Account', accountSchema)
module.exports = Account