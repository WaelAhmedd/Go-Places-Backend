// \Users\WaelAhmed\mongoDp\bin\mongod.exe --dbpath=\Users\WaelAhmed\mongodbData
//npm run dev
const express =require('express')
require('./db/mongose')
const User = require('./models/user')


const app = express()
const port =3000

//app.use(express.json())
//app.use(userRouter)

const user=new User({name:"wael",email:"waelahmed@gmail.com",password:"asasasas"})
user.save()
//console.log(user.email)
/*app.listen(port,()=>{
    console.log('server'+port)
})*/
console.log('hola')