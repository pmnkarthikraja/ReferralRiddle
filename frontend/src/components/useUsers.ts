import { useEffect, useState } from "react";
import { UserDetail } from "./dataStructure";
import { userApi } from "./userApi";

interface UseUsersReturn{
    isLoading:boolean,
    userDetails:UserDetail[]
}

export function useUsers():UseUsersReturn {
    const [userDetails,setUserDetails]=useState<UserDetail[]>([])
    const [isLoading,setIsLoading]=useState<boolean>(false)
    useEffect(()=>{
        const getUsers =async ()=>{
             try{
                setIsLoading(true)
                const result = await userApi.getUsers()
                setIsLoading(false)
                setUserDetails(result.data)
             }catch(e){
                console.log("error on getting users")
             } 
        }
        getUsers()
},[])
    return {
        isLoading,
        userDetails
    }
}