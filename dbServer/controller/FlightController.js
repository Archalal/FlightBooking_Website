const flights=require('../database/models/flightModel')


exports.flightAddController=async(req,res)=>{

  const  {
        tripType,airlineName,flightNumber,destinationName,dateOfDeparture,flightDuration,departureCity,depatureAirportCode,
        refundable,cabinClass,availiableSeat,price,arrivalAirportCode,arrivalCity,returnDate,returnTime

    }=req.body
    
    const destinationImg=req.file.filename
    // console.log(destinationImg);
    const userId=req.userId
    


    const existingFlight= await flights.findOne({flightNumber})
    if(existingFlight){
        res.status(409).json("flight already added")
    }
    else{
        if(tripType=="oneWay"){
            const newFlight=new flights({
                tripType,airlineName,flightNumber,destinationName,dateOfDeparture,flightDuration,departureCity,depatureAirportCode,
                destinationImg, refundable,cabinClass,availiableSeat,price,arrivalAirportCode:"",arrivalCity:"",returnDate:"",
                returnTime:"",userId

            })

            await newFlight.save()
            res.status(201).json(newFlight)

        }else{
            const newFlight=new flights({
                tripType,
                airlineName,
                flightNumber,
                destinationName,
                dateOfDeparture,
                flightDuration,
                departureCity,
                depatureAirportCode,
                destinationImg,
                refundable,
                cabinClass,
                availiableSeat,
                price,
                arrivalAirportCode,
                arrivalCity,
                returnDate,
                returnTime,
                userId
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
            tripType,
            airlineName,
            flightNumber,
            destinationName,
            dateOfDeparture,
            flightDuration,
            departureCity,
            depatureAirportCode,
            destinationImg,
            refundable,
            cabinClass,
            availiableSeat,
            price,
            arrivalAirportCode,
            arrivalCity,
            returnDate,
            returnTime
    

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
                tripType,
                airlineName,
                flightNumber,
                destinationName,
                dateOfDeparture,
                flightDuration,
                departureCity,
                depatureAirportCode,
                destinationImg:changedImg,
                refundable,
                cabinClass,
                availiableSeat,
                price,
                arrivalAirportCode,
                arrivalCity,
                returnDate,
                returnTime,
                userId
        

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