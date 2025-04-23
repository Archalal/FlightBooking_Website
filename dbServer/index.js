require('dotenv').config()
require('./database/dataBaseConnection')

const express=require("express")
const cors=require('cors')
const router=require('./routes/router')

const aeroServer=express()

aeroServer.use(cors())
aeroServer.use(express.json())
aeroServer.use('/uploads',express.static('./uploads'))
aeroServer.use(router)





const PORT=3000 ||process.env.PORT


aeroServer.listen(PORT,()=>{
   console.log( `sucessfully running in the ${PORT} and waiting for client request`);
   
})