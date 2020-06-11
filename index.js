// \Users\WaelAhmed\mongoDp\bin\mongod.exe --dbpath=\Users\WaelAhmed\mongodbData
//npm run dev
const express =require('express')
require('./src/db/mongose')
const User = require('./src/models/user')
const userRouter = require('./src/routers/user-router')
const orgnizationRouter=require('./src/routers/orgnization-router')
const branchRouter=require('./src/routers/branch-router')
const accountRouter=require('./src/routers/account-router')
//E:\nodejs\[FreeCourseSite.com] Udemy - The Complete Node.js Developer Course (3rd Edition)\10. MongoDB and Promises (Task App)


const app = express()
const port =3000
app.use(express.json())
app.use(accountRouter)
app.use(userRouter)
app.use(orgnizationRouter)
app.use(branchRouter)

//const user=new User({name:"wael",email:"waelahmed@gmail.com",password:"asasasas"})
//user.save()
//console.log(user.email)
app.listen(port,()=>{
    console.log('server'+port)
})
console.log('hola')