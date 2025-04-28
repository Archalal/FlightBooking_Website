const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({

    role:{
        type:String,
        required:true
    },
   
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            // required:true
        },
        email:{
            type:String,
            // required:true,
            unique:true
        },
        dob:{
            type:String,
            // required:true
        },
        phoneNumber:{
            type:String,
            // required:true
        },
        address:{
            type:String,
            // required:true
        },
        password:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:["pending","accept","reject"],
            default:"pending"
        },
        rejectionStatement:{
            type:String
        }
       
    }
)

const users=mongoose.model("users",userSchema)
module.exports=users