const flights = require('../database/models/flightModel')


exports.flightAddController=async(req,res)=>{

  let  {
        tripType,airlineName,flightNumber,departureAirportCode,departureName,dateOfDeparture,timeOfDeparture,destinationAirportCode,
        destinationName,dateOfDestination,timeOfDestination,flightDuration,refundable,cabinClass,price,returnDate,returnTime,avaiableSeat

    }=req.body
    
    const destinationImg=req.file.filename
    // console.log(destinationImg);
    const userId=req.userId
    if (dateOfDestination) {
        const [day, month, year] = dateOfDestination.split("/");
        dateOfDestination = new Date(`${year}-${month}-${day}`);
      }

      if (returnDate) {
        const [day, month, year] = returnDate.split("/");
        returnDate = new Date(`${year}-${month}-${day}`);
      }

    
    


    const existingFlight= await flights.findOne({flightNumber})
    if(existingFlight){
        res.status(409).json("flight already added")
    }
    else{
        if(tripType=="oneWay"){
            const newFlight=new flights({
                tripType,airlineName,flightNumber,departureAirportCode,departureName,dateOfDeparture,timeOfDeparture,destinationAirportCode,destinationImg, destinationName,dateOfDestination,timeOfDestination
                 ,flightDuration,refundable,cabinClass,price,returnDate:"",returnTime:"",avaiableSeat,userId

            })

            await newFlight.save()
            res.status(201).json(newFlight)

        }else{
            const newFlight=new flights({
                tripType,airlineName,flightNumber,departureAirportCode,departureName,dateOfDeparture,timeOfDeparture,destinationAirportCode,destinationImg, destinationName,dateOfDestination,timeOfDestination,
        flightDuration,refundable,cabinClass,price,returnDate,returnTime,avaiableSeat,userId
            })

            await newFlight.save()
            res.status(201).json(newFlight)

        }
    }

}


exports.flightView=async(req,res)=>{

    try{
        const allFlight=await flights.find({})
        res.status(200).json(allFlight)

    }catch(err){
        res.status(500).json({err:err})
    }

}


exports.flightEdit=async(req,res)=>{
    console.log(req);
    
   

        const{
            tripType,airlineName,flightNumber,departureAirportCode,departureName,dateOfDeparture,timeOfDeparture,destinationAirportCode,destinationImg, destinationName,dateOfDestination,timeOfDestination,
        flightDuration,refundable,cabinClass,price,returnDate,returnTime,avaiableSeat
    

        }=req.body

        const userId=req.userId
        // console.log(userId);
        
        const id=req.params.id
        // console.log(id);

        const changedImg=req.file?req.file.filename:destinationImg
        try{
        const updatedFlight= await flights.findByIdAndUpdate(
            {_id:id},
            {
                tripType,airlineName,flightNumber,departureAirportCode,departureName,dateOfDeparture,timeOfDeparture,destinationAirportCode,destinationImg:changedImg, destinationName,dateOfDestination,timeOfDestination,
                flightDuration,refundable,cabinClass,price,returnDate,returnTime,avaiableSeat,userId
        

            },
            {new:true}
        )
        if(updatedFlight){
            const flightUpdate=   await updatedFlight.save()
            res.status(200).json(flightUpdate)
        }else{
            res.status(403).json("Flight not found")
        }

        
        
        
     
     console.log("hello",flightUpdate);
     
       
        

    }catch(err){
        res.status(500).json({err:err})
    }
}

exports.deleteFlight=async(req,res)=>{
    const id=req.params.id
    try{
    
        const deletedflight=await flights.findByIdAndDelete(id)
        res.status(200).json(deletedflight)
        

    }catch(err){
        res.status(500).json({err:err})
    }
}

exports.getFlights=async(req,res)=>{
    try{
        const allFlights=await flights.find()
        res.status(200).json(allFlights)
    }
    catch(err){
        res.status(500).json({err:err})
    }
}

exports.flightSearch=async(req,res)=>{
    const{departureName, destinationName, dateOfDeparture, returnDate, cabinClass,avaiableSeat
    }=req.query
    console.log(departureName);
    
    try{

        let query={}
       
        if(departureName){
            query.departureName={$regex:departureName,$options:"i"}
        }
        if(destinationName){
            query.destinationName={$regex:destinationName,$options:"i"}
        }
        if (dateOfDeparture) {
            const date = new Date(dateOfDeparture);
            query.dateOfDeparture = {
              $gte: new Date(date.setHours(0, 0, 0, 0)),
              $lte: new Date(date.setHours(23, 59, 59, 999)),
            };
          }
          

       

        if(cabinClass){
            query.cabinClass={$regex:cabinClass,$options:"i"}
        }
        if(avaiableSeat){
            query.avaiableSeat={$gte: Number(avaiableSeat)}
        }
        if (returnDate) {
            const date = new Date(returnDate);
            query.returnDate = {
              $gte: new Date(date.setHours(0, 0, 0, 0)),
              $lte: new Date(date.setHours(23, 59, 59, 999)),
            };
            query.tripType = "return";
          } else {
            query.tripType = "oneWay";
          }
          
         
        
          

        const flightSearch=await flights.find(query)
        res.status(200).json(flightSearch);

    }catch(err){
        res.status(500).json({err:err})
    }
}


exports.getSingleFlight=async(req,res)=>{

    const id=req.params.id
    try{

        let requestedFlight=await flights.findById(id)
        res.status(200).json(requestedFlight)

    }
    catch(err){
        res.status(500).json({err:err})
    }

}