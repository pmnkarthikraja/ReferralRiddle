import { AxiosError, AxiosResponse } from "axios";
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "react-query";
import { UserDetail, UserLogin } from "../schema/dataStructure";
import { SendEmailPayload, emailApi } from "../api/emailApi";
import { userApi } from "../api/userApi";

interface AxiosErrorType{
    message:string,
    success:boolean
}

interface AuthAxiosError{
  status:boolean,
  user: UserDetail
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


  export const useAuth = () => {
    const queryClient = useQueryClient();
    const mutate:UseMutationResult<AxiosResponse<{success:boolean,user:UserDetail}, any>, AxiosError<AuthAxiosError, any>, void, unknown>= useMutation(
      () => userApi.authUser(),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('userAuth');
          console.log("user authentication successfull", data);
        },
        onError: (e:AxiosError<AuthAxiosError>) =>console.log("user auth failed",e)
      }
    );
    return mutate
  };

  
  


  export const useGetUsers = (refetchInterval?: number) => {
    return  useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const res =await userApi.getUsers()
          return res.data 
        },
        onError:(e:AxiosError<AxiosErrorType>)=>e,
        refetchInterval,
      })
  }
 

  export const useGetEmails = (refetchInterval?: number) => {
    const query =  useQuery({
      queryKey: ['emails'],
      queryFn: async () => {
        const res = await emailApi.getEmails();
        return res.data.emails;
      },
      onError:(e:AxiosError<AxiosErrorType>)=>e,
      refetchInterval,
    });
    return query
  };

 

  export const useSendEmailMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(
      (payload: SendEmailPayload) => emailApi.sendCode(payload),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries('emails');
          console.log("on send email mutation success: ", data);
        },
        onError: (e:AxiosError<AxiosErrorType>) => {
          console.log("error on send email", e);
        },
      }
    );
  };