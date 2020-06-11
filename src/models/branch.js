const mongoose = require('mongoose')



const branchSchema=new mongoose.Schema({
 
    branchName:{
        required:true,
        type:String,
        trim:true
    },
   
    Number:{
        type:String,
        required:true,
        trim:true

    },
    orgnizationId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    address:{
        type:String,
        required:false,
        trim:true
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Account'
         
    }
})

const Orgnization = mongoose.model('Branch', branchSchema)

module.exports = Orgnization