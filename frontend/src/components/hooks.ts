import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserDetail, UserLogin } from "./dataStructure";
import { userApi } from "./userApi";
import { emailApi } from "./emailApi";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface AxiosErrorType{
    message:string,
    success:boolean
}

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      (userDetails: UserDetail) => userApi.onRegister(userDetails),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('userDetails');
          console.log("on register mutation success: ", data);
        },
        onError: (e:AxiosError<AxiosErrorType>) => {
          console.log("error on onRegister", e);
        }
      }
    );
  };

  export const useLoginMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      (userLogin: UserLogin) => userApi.onLogin(userLogin),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('userLogin');
          console.log("on login mutation success: ", data);
        },
        onError: (e:AxiosError<AxiosErrorType>) => {
          console.log("error on onLogin", e);
        }
      }
    );
  };


  export const useGetUsers = () => {
    return  useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const res =await userApi.getUsers()
          return res.data 
        },
        onError:(e:AxiosError<AxiosErrorType>)=>e,
        refetchInterval: 2000,
      })
  }
 

  export const useGetEmails = () => {
    const query =  useQuery({
      queryKey: ['emails'],
      queryFn: async () => {
        const res = await emailApi.getEmails();
        return res.data.emails;
      },
      onError:(e:AxiosError<AxiosErrorType>)=>e,
      refetchInterval: 2000
    });
    return query
  };
 

