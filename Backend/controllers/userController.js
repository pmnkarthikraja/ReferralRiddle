const userModel = require('../models/UserModels')
const { createJSONWebToken } = require('../util/authToken')
const bcrypt = require('bcrypt')

//To create a Task - POST
 const createUser =async (req,res)=>{
  const {userName,email,phone,password,ownReferralCode,opReferralCode}=req.body
  console.log("user signup",userName,email,phone,password,ownReferralCode,opReferralCode)
    try{
      const existingUser = await userModel.findOne({email})
      if (existingUser){
        console.log("existed")
        return res.status(409).json({error:'User Already Exists!'})
      }
      if (opReferralCode!=''){
        const user = await userModel.find({ownReferralCode:opReferralCode})
        if (!!user && user!=''){
          console.log(`hurraayyyy, user signup by using  ${user} referral code!`,)
        }else{
         return res.status(404).json({message:'Provided Referral Code not Exists',success:false,user})
        }
      }
        const user = await userModel.create({userName,email,phone,password,ownReferralCode,opReferralCode})
        const jsonToken = createJSONWebToken(user._id)
        res.cookie('token',jsonToken,{
          withCredentials:true,
          httpOnly:false
        })
        res.status(201).json({message:'User Signed up Successfully',success:true,user})

      }catch(e){
      if (e.code == 11000){
        res.status(409).json({error:`${Object.keys(e.keyValue)} field duplicated!`})
        return
      }
        res.status(400).json({
            error:e.message
        })
    }
}


const login= async (req,res,next)=>{
  console.log("login")
try{
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log("user",user)
  if(!user){
    return res.status(404).json({message:'Incorrect password or email' }) 
  }
  const auth = await bcrypt.compare(password,user.password)
  if (!auth) {
    return res.status(404).json({message:'Incorrect password or email' }) 
  }
  const token = createJSONWebToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });
  res.status(201).json({ message: "User logged in successfully", success: true });
  next()
}catch(e){
  console.log('err',e)
  res.status(400).json({error:e.message})
}
}

const getUsers = async (req,res)=>{
  try{
    const users = await userModel.find({})
    res.status(200).json(users)
  }catch(e){
    console.log(e)
    res.status(400).json({error:e.message})
  }
}




module.exports = { createUser, getUsers,login}