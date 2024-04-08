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

//define referral code
//first 2 number
//second 2 a-z
//third 2 A-Z
//forth 2 number

//referral pattern = 23aiAD33

