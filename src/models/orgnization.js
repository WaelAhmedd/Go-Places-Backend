const mongoose = require('mongoose')



const orgnizationSchema=new mongoose.Schema({
 
    orgnizationName:{
        required:true,
        type:String,
        trim:true
    },
    orgnizationSector:{
        type:String,
        required:true,
        trim:true
        
    },
    Number:{
        type:String,
        required:true,
        trim:true

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
         
    },
    defaultSystem:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'System'
         
    }
})
orgnizationSchema.virtual('branches', {
    ref: 'Branch',
    localField: '_id',
    foreignField: 'orgnizationId'
})
const Orgnization = mongoose.model('Orgnization', orgnizationSchema)

module.exports = Orgnization