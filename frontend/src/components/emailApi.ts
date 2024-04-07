import axios, { AxiosResponse } from "axios";
import { EmailStruct } from "./dataStructure";

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

export interface EmailAPI{
    getEmails:()=>Promise<{data:HandleEmailDetails}>
    sendCode:(from:string,referralCode:string,addresses:EmailStruct[])=>Promise<AxiosResponse>
   
}


const BASE_URL = 'http://192.168.204.199:4000/api/users'

class EmailAPIService implements EmailAPI{
  async  getEmails () : Promise<{data:HandleEmailDetails}>{
    const d=  await axios.get(`${BASE_URL}/emails`)
    return d
  }

  async sendCode(from:string,referralCode:string,addresses:EmailStruct[]):Promise<AxiosResponse>{
    console.log("sending ",addresses)
    const res =  await axios.post(`${BASE_URL}/sendCodeToMails`,{
      from,
      addresses,
      referralCode
    })
    return res
  }
 
}

export const emailApi = new EmailAPIService()
