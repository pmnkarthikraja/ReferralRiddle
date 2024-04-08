const userModel = require('../models/UserModels')
const { createJSONWebToken } = require('../util/authToken')
const bcrypt = require('bcrypt')

 const signUp =async (req,res,next)=>{
  const {userName,email,phone,password,ownReferralCode,opReferralCode}=req.body
    try{
      const existingUser = await userModel.findOne({email})
      if (existingUser){
        console.log("user email exists")
        return res.status(409).json({message:'User Already Exists!',success:false})
      }
      if (opReferralCode!=''){
        const user = await userModel.findOne({ownReferralCode:opReferralCode})
        if (user==undefined || user==''){
          return res.status(404).json({message:'Provided Referral Code not Exists',success:false,user})
        }
      }
        const user = await userModel.create({userName,email,phone,password,ownReferralCode,opReferralCode})
        const jsonToken = createJSONWebToken(user._id)
        res.cookie('token',jsonToken,{
          withCredentials:true,
          httpOnly:false
        })
        console.log("user successfully signed out!")
        res.status(201).json({message:'User Signed up Successfully',success:true,user})

      }catch(e) {
      if (e.code == 11000){
        res.status(409).json({message:`${Object.keys(e.keyValue)} not available!`,success:false})
        return
      }
        res.status(500).json({
            message:e.message,
            success:false
        })
    }
}


const login= async (req,res,next)=>{
try{
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if(!user){
    return res.status(404).json({message:'Incorrect password or email',success:false }) 
  }

  const auth = await bcrypt.compare(password,user.password)
  if (!auth) {
    return res.status(404).json({message:'Incorrect password or email',success:false }) 
  }
  const token = createJSONWebToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });
  res.status(201).json({ message: "User logged in successfully", success: true });
  next()
}catch(e){
  console.log("login error:",e.message)
  res.status(500).json({message:e.message,success:false})
}
}

const getUsers = async (req,res)=>{
  try{
    const users = await userModel.find({})
    res.status(200).json(users)
  }catch(e){
    console.log("get users error:",e.message)
    res.status(500).json({error:e.message})
  }
}




module.exports = {  signUp, getUsers,login}