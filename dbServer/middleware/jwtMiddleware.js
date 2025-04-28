const jwt=require('jsonwebtoken')


const verifyUsers=async(req,res,next)=>{

    const verifyToken=req.headers['authorization'].split(' ')[1]
    // console.log(verifyToken);
    const id=jwt.verify(verifyToken,process.env.jWT)
    // console.log(id,"haha");
    req.userId=id.token 
    // console.log("hoii",req.userId);
    
    next()
    
    

}

module.exports=verifyUsers