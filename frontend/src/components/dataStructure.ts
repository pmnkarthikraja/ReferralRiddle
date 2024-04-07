export interface UserDetail{
    userName:string,
    email:string,
    phone:string,
    password:string,
    ownReferralCode?:string,
    opReferralCode?:string,
}

export interface UserLogin{
    email:string,
    password:string,
}

export interface EmailStruct{
    address:string,
}

// export const referralCodePattern = /^\d{2}[a-z]{2}[A-Z]{2}\d{2}$/;


//define referral code
//first 2 number
//second 2 a-z
//third 2 A-Z
//forth 2 number

//23aiAD33

