const mongoose = require('mongoose')



const liveTrackingSchema=new mongoose.Schema({
 
    currentNumber:{
        type:Number,
        required:false,
        trim:true
    },
   
    maxNumber:{
        type:Number,
        required:true,
        trim:true

    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
})

const LiveTracking = mongoose.model('LiveTracking', liveTrackingSchema)

module.exports = LiveTracking