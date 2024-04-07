import { useEffect, useState } from "react";
import { EmailWithReferee, emailApi } from "./emailApi";
import axios, { AxiosError } from "axios";

export function useEmail():{emails:EmailWithReferee[],apiError:(AxiosError|undefined),loading:boolean} {
    const [addresses,setAddresses]=useState<{emails:EmailWithReferee[]}>({
       emails:[]
    })
    const [apiError,setApiError]=useState<AxiosError>()
    const [loading,setLoading]=useState<boolean>(false)
    useEffect(()=>{
         const getEmails = async()=>{
            try{
                setLoading(true)
                const emails = await emailApi.getEmails()
                const d = emails.data
                setLoading(false)
                if (!!d){
                    setAddresses({
                        emails:d.emails
                    })
                }
            }catch(e){
                if (axios.isAxiosError(e)){
                    console.error("error on getting emails",e)
                    setApiError(e)
                }
            }
         }
         getEmails()
    },[])
    
    return {
        emails:addresses.emails,
        apiError,
        loading,
    }
}