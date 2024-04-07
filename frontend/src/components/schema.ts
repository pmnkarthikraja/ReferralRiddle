import { Describe, object, optional, refine, string } from 'superstruct'
import { UserDetail, UserLogin } from './dataStructure'


const emailRefinement= refine(string(),'Email',(value)=>{
    const emailPattern =/^\s*\S+@\S+(\.\S{2,3})+\s*$/
    if (!emailPattern.test(value)){
        return `Please Enter a valid Email Address!`
    }
    return true
})

const referralCodeRefinement = refine(string(),'Referral Code',(value)=>{
    const referralPattern = /^\d{2}[a-z]{2}[A-Z]{2}\d{2}$/
    if (!referralPattern.test(value)){
        return `Referral code should be 2 digits, 2 lowercase letters, 2 uppercase letters, and 2 digits. For example, 12abCD34.`
    }
    return true
})

const phoneRefinement = refine(string(),'Referral Code',(value)=>{
    const phonePattern = /^\+?[1-9]\d{1,14}$/
    if (!phonePattern.test(value)){
        return `Please Enter a valid Phone Number!`
    }
    return true
})

const passwordRefinement = refine(string(),'Password',value=>{
    if (value.length <=3){
        return 'Password should be greater than 3!'
    }
    return true
})


export const userDetailSchema:Describe<UserDetail> = object({
    email:emailRefinement,
    password:passwordRefinement,
    phone:phoneRefinement,
    userName:string(),
    ownReferralCode:optional(referralCodeRefinement),
    opReferralCode:optional(referralCodeRefinement),
})



export const userLoginSchema:Describe<UserLogin>=object({
    email:emailRefinement,
    password:passwordRefinement
})


