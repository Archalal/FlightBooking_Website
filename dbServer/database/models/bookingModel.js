const mongoose=require("mongoose")

const bookingSchema=new mongoose.Schema({
    
        tripType:{
            type:String,
            default:"one-way",
            enum:["one-way","return"],
            required: true

        },
        flightNumber:{
            type:String,
            required: true
        },
        departure:{
            departureCity:{
                type:String,
                required: true
            },
            departureTime:{
                type:String,
                required: true
            },
            departureDate:{
                type:String,
                required: true
            }

        },
        arrival:{
            arrivalCity:{
                type:String,
                required: true
            },
            arrivalTime:{
                type:String,
                required: true
            },
            arrivalDate:{
                type:String,
                required: true
            }

        },
        returnDetails:{
            
            returnArrivalTime:{
                type:String
            },
            returnArrivalDate:{
                type:String,
              
            }

        },
        bookingStatus:{
            type:String,
            default:"pending",
            enum:["pending","paided","cancelled"],
            required: true
            
        },totalPrice: {
            type: String,
            required: true
          }
    ,
    userId:{
        type:String,
        required:true
        

    }

        
    
})

const bookings=mongoose.model("bookings",bookingSchema)
module.exports=bookings