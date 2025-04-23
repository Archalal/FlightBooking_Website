const mongoose=require('mongoose')
const connectionString=process.env.CONNECTIONSTRING

mongoose.connect(connectionString)
.then(()=>{
    console.log("sucessfully connected to MongoDb");
    
})
.catch((err)=>{
    console.log("Failed while connecting to mongoDB");
    console.log(err);
    
    
})