const mongoose=require("mongoose")

const bookedSchema= new mongoose.Schema({
    
    username:{
        type:String
    },
    price:{
        type:Number
    },
    departureName:{
        type:String
    },
    destinationName:{
        type:String
    },
    refundable:{
        type:Boolean
    },
    totalPassenger:{
        type:Number
    },
    userId:{
        type:String
    },
    flightId:{
        type:String
    }

})

const bookings=mongoose.model("bookings",bookedSchema)
module.exports=bookings