// \Users\WaelAhmed\mongoDp\bin\mongod.exe --dbpath=\Users\WaelAhmed\mongodbData
//npm run dev
const express =require('express')
require('./db/mongoose')



const app = express()
const port =3000

app.use(express.json())
//app.use(userRouter)



app.listen(port,()=>{
    console.log('server'+port)
})