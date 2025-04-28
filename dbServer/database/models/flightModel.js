const mongoose=require('mongoose')

const flightSchema=new mongoose.Schema({
     
    tripType:{
        type:String,
        required:true
    },
    airlineName:{
        type:String,
        required:true
    },
    flightNumber:{
        type:Number,
        required:true,
        unique:true
        
        
    },
    destinationName:{
        type:String,
        required:true
    },
    dateOfDeparture:{
        type:Date,
        required:true
    },
    flightDuration:{
        type:String,
        required:true
    },
    departureCity:{
        type:String,
        required:true
    },
    depatureAirportCode:{
        type:String,
        required:true
    },
    destinationImg:{
        type:String,
        required:true
    },
    refundable:{
        type:Boolean,
        required:true
    },
    cabinClass:{
        type:String,
        required:true
    },
    availiableSeat:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    arrivalAirportCode:{
        type:String,
        required: function() { 
            return this.tripType === 'return' 
          }
       
    },
    arrivalCity:{
        type:String,
        required: function() { 
            return this.tripType === 'return' 
          }
    },
    returnDate:{
        type:Date,
        required: function() { 
            return this.tripType === 'return' 
          }
        
    },
    returnTime:{
        type:String,
        required: function() { 
            return this.tripType === 'return' 
          }

    },
    userId:{
        type:String,
        required:true
    }
})

const flights=mongoose.model("flights",flightSchema)
module.exports=flights