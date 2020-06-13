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
         
    },
    state:{
        type:String,
        enum : ['Low crowded', 'Medium crowded', 'High crowded', 'Full'],
        default: 'Low crowded',
        required:false,
        trim:true
    },
    system:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'System'
         
    }
})
branchSchema.virtual('liveTrackingData', {
    ref: 'LiveTracking',
    localField: '_id',
    foreignField: 'branchId'
})
const Orgnization = mongoose.model('Branch', branchSchema)

module.exports = Orgnization