const mongoose = require('mongoose')



const reservationSchema=new mongoose.Schema({
 
    isRequired:{
        type:Boolean,
        required:true,
        trim:true
    },
    reservationType:{
        type:String,
        enum : ['Dpecialist Decision', 'Intervals', 'User Request'],
        default: 'User Request',
        required:false,
        trim:true
    },
    high:{
        type:String,
        required:false,
        trim:true
    },
    medium:{
        type:String,
        required:false,
        trim:true
    },
    low:{
        type:String,
        required:false,
        trim:true
    },
    order:{
        type:Boolean,
        required:true,
        trim:true
    },
    delivery:{
        type:Boolean,
        required:true,
        trim:true
    },
    waitingList:{
        type:Boolean,
        required:true,
        trim:true
    },
    punishment:{
        type:Boolean,
        required:true,
        trim:true
    },
    punishmentType:{
        type:String,
        enum : ['I', 'II'],
        default: 'I',
        required:false,
        trim:true
    },
    punishmentValue:{
        type:Number,
        required:false,
        trim:true
    },
    
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation