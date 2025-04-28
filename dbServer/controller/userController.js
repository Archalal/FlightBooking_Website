const users=require('../database/models/userModel')
const jwt=require("jsonwebtoken")
const nodemailer=require('nodemailer')


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


   try{
    const existingUser=await users.findOne({email})

   if(!existingUser){
    res.status(401).json("invalid email/password")
   }
   if(password){
    if(existingUser.password==password){
      res.status(401).json("invalid email/password")
    }
   }

   const token=jwt.sign({token:existingUser._id},process.env.jWT)
   res.status(200).json({
    email:existingUser.email,
    username:existingUser.name,
    role:existingUser.role,
    token:token

   })



   }
   catch(err){
    res.status(500).json({err:err})
   }
    
}
   
 
 
 
 
 
 


exports.adminStaffAdd = async (req, res) => {
  const { role, name, email, password } = req.body;

  try {


    const existingStaff = await users.findOne({ email });
    if (existingStaff) {
      return res.status(409).json({ error: "Staff already exists" });
    }

    
    const newStaff = new users({
      role,
      name,
      email,
      password 
    });

   
    await newStaff.save();

  
    // Create the transporter using Gmail SMTP settings
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.ADMINEMAIL, 
          pass: process.env.ADMINPASSWORD 
        }
      });
    // Set up the email options
    const mailOptions = {
        from: {
          name: "Flight Booking Platform Admin", 
          address: process.env.ADMINEMAIL
        },
        to: email,
        subject: `Welcome Aboard, ${name}! Your Flight Booking Platform Account`,
        text: `Dear ${name},
      
      Welcome to the Flight Booking Platform!
      
      Your account has been successfully created by the administrator. Here are your login details:
      
      Email: ${email}
      Temporary Password: ${password}
    
      
          <div class="credentials">
            <p><strong>Login Details:</strong></p>
            <p>Email: <strong>${email}</strong></p>
            <p> Password: <strong>${password}</strong></p>
          </div>
          
          
          
        </div>
        
       
      </body>
      </html>`
      };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);

    
    res.status(201).json({ 
      success: true,
      message: "User created and email sent successfully",
      user: {
        id: newStaff._id,
        name: newStaff.name,
        email: newStaff.email,
        role: newStaff.role
      }
    });

  } catch (err) {
    console.error("Error in adminStaffAdd:", err);
    res.status(500).json({
      error: "Server error while adding staff",
      message: err.message 
    });
  }
};
