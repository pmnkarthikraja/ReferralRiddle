import { useEffect, useState } from "react";
import { EmailWithReferee, emailApi } from "./emailApi";

export function useEmail():{emails:EmailWithReferee[]} {
    const [addresses,setAddresses]=useState<{emails:EmailWithReferee[]}>({
       emails:[]
    })
    useEffect(()=>{
         const getEmails = async()=>{
            try{
                const emails = await emailApi.getEmails()
                const d = emails.data
                if (!!d){
                    setAddresses({
                        emails:d.emails
                    })
                }
            }catch(e){
                console.log("eerror",e)
                throw Error("error on getting emails")
            }
         }
         getEmails()
    },[])
    
    return addresses
}