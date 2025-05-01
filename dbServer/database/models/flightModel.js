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

    departureAirportCode:{
        type:String,
        required:true
    },
    
    departureName:{
        type:String,
        required:true
    },
    dateOfDeparture:{
        type:Date,
        required:true
    },
    timeOfDeparture:{
        type:String,
        required:true
    },
    
    destinationAirportCode:{
        type:String,
        required: true
       
    },
    destinationImg:{
        type:String,
        required:true
    },
    destinationName:{
        type:String,
        required:true
    },
    dateOfDestination:{
        type:Date,
        required:true
    },
    timeOfDestination:{
        type:String,
        required:true
    },
    flightDuration:{
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
    price:{
        type:Number,
        required:true
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
    avaiableSeat:{
        type:"Number",
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const flights=mongoose.model("flights",flightSchema)
module.exports=flights