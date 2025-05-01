const bookings=require('../database/models/bookedModel')


exports.addBooking=async(req,res)=>{

    const userId=req.userId
    const flightId=req.params.id
    console.log("hi",flightId);
    console.log(req.body);
    
    

    const{
        username,
        price,
        departureName,
        destinationName,
        refundable,
        totalPassenger
    }=req.body
        
        
    try{

        const existingUser=await bookings.find({userId,flightId})
        if(existingUser.length>0){
            res.status(409).json("Ticket is Already Booked")
        }else{
            const newBooked= new bookings({
                username,
                price,
                departureName,
                destinationName,
                refundable,
                totalPassenger,
                userId,
                flightId
            }
            )
            await newBooked.save()
            res.status(201).json(newBooked)
        }

    }catch(err){
        res.status(500).json({err:err})
    }

}