import axios, { AxiosResponse } from "axios";
import { EmailStruct } from "../schema/dataStructure";

export interface Referee{
  email:string,
  referralCode:string
}

export interface EmailWithReferee{
  _id:string,
  address:string,
  referees:Referee[]
}

export interface HandleEmailDetails{
  emails:EmailWithReferee[]
}

export interface SendEmailPayload{
  from:string,
  referralCode:string,
  addresses:EmailStruct[]
}


export interface EmailAPI{
    getEmails:()=>Promise<{data:HandleEmailDetails}>
    sendCode:(payload:SendEmailPayload)=>Promise<AxiosResponse<{message:string,success:boolean}>>
   
}


const BASE_URL = 'http://3.89.33.147/api/users'

class EmailAPIService implements EmailAPI{
  async  getEmails () : Promise<{data:HandleEmailDetails}>{
    const d=  await axios.get(`${BASE_URL}/emails`)
    return d
  }

  async sendCode(payload:SendEmailPayload):Promise<AxiosResponse<{message:string,success:boolean}>>{
    console.log("sending ",payload)
    const res =  await axios.post(`${BASE_URL}/sendCodeToMails`,{
      ...payload
    })
    return res
  }
 
}

export const emailApi = new EmailAPIService()
