const users=require('../database/models/userModel')
const jwt=require("jsonwebtoken")


exports.registerController=async(req,res)=>{
    const{
        role,
        name,
        email,
        dob,
        phoneNumber,
        address,
        password
        
    }=req.body

    const image=req.file.filename
    console.log(req);
    

try{
    existingUser= await users.findOne({email})
    if(existingUser){
        res.status(409).json("User Already registered....please login")
    }
    else{
        const newUser=new users({role,name,image,email,dob,phoneNumber,address,password})
        await newUser.save()
        res.status(201).json(newUser)
    }
}
catch(err){
    res.status(500).json({err:err})
}
}


exports.loginController=async(req,res)=>{
    const{email,password}=req.body
    
    // console.log(email);
    
    try{
        const existingUser= await users.findOne({email})
        // console.log(existingUser);
        
            if(existingUser){
                const token=jwt.sign({token:existingUser._id},process.env.jWT)
                console.log(token);
                
                res.status(200).json({name:existingUser.name,email:existingUser.email,role:existingUser.role,token:token})
              
                if(password){
                    if(existingUser.password==password){
                        const token=jwt.sign({token:existingUser._id},process.env.jWT)
                        res.status(200).json({name:existingUser.name,email:existingUser.email,role:existingUser.role,token:token})
                    }
                }
                

            }else{
                res.status(401).json("Invalid username/password")
            }
        

    }catch(err){
        res.status(500).json({err:err})
    }
}