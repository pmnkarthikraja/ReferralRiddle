import axios, { AxiosResponse } from "axios";
import { UserDetail, UserLogin } from "../schema/dataStructure";

export interface UserAPI{
onRegister:(userDetails:UserDetail)=>Promise<AxiosResponse>
onLogin:(loginDetail:UserLogin)=>Promise<AxiosResponse>
authUser:()=>Promise<AxiosResponse>
getUsers:()=>Promise<AxiosResponse<UserDetail[],any>>
}

const BASE_URL = 'http://localhost:4000/api/users'

class UserAPIService implements UserAPI{
    async onRegister (userDetails: UserDetail):Promise<AxiosResponse>{
       return await axios.post(`${BASE_URL}/signup`,{...userDetails},{
        withCredentials:true,
       })
    }
    async onLogin (loginDetail: UserLogin):Promise<AxiosResponse<any, any>>{
        return await axios.post(`${BASE_URL}/login`,{...loginDetail},{
            withCredentials:true
        })
    }

    async authUser():Promise<AxiosResponse<any, any>>{
        return await axios.post(BASE_URL,{},{
            withCredentials:true
        })
    }

    async getUsers():Promise<AxiosResponse<UserDetail[],any>>{
        return await axios.get(`${BASE_URL}`)
    }
}

export const userApi = new UserAPIService()
