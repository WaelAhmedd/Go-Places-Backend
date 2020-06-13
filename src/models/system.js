const mongoose = require('mongoose')



const systemSchema=new mongoose.Schema({
 
    reservation:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Reservation'
         
    },
   
    openAt:{
        type:String,
        required:true,
        trim:true

    },
    closeAt:{
        type:String,
        required:true,
        trim:true

    }
})

const System = mongoose.model('System', systemSchema)

module.exports = System