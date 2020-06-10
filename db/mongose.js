const mongoose=require('mongoose')

const connectionURL2='mongodb://127.0.0.1:27017/go-places-api'
const databaseName='go-places'
mongoose.connect(connectionURL2,{useNewUrlParser:true,useUnifiedTopology: 
    true,useCreateIndex:true})



