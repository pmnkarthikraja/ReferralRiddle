import { EuiButton, EuiButtonEmpty, EuiCallOut, EuiCard, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormErrorText, EuiFormRow, EuiIcon, EuiPage, EuiSpacer, EuiText, EuiTitle } from "@elastic/eui"
import axios from "axios"
import { FunctionComponent, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { UserLogin } from "./dataStructure"
import { userApi } from "./userApi"
import { Failure, StructError, assert } from "superstruct"
import { userLoginSchema } from "./schema"


const LoginPage: FunctionComponent = () => {
    const { handleSubmit, register, setValue, formState: { errors }, clearErrors } = useForm<UserLogin>()
    const [message, setMessage] = useState<string>('')
    const [failures,setFailures]= useState<Failure[]>([])
    const navigate = useNavigate()

    const onLogin = async (loginDetail: UserLogin) => {
        try{
            setFailures([])
            assert(loginDetail,userLoginSchema)
            try {
                const res = await userApi.onLogin(loginDetail)
                const { message, success } = res.data
                if (success) {
                    setTimeout(() => {
                        console.log('navigated')
                        navigate('/')
                    }, 2500)
                }
                setMessage(res.data.message)
            } catch (e) {
                console.log("err on login",e)
                if (axios.isAxiosError(e)) {
                    setMessage(e.response?.data.message)
                    return
                }
            }
        }catch(e){
            if (e instanceof StructError){
                setFailures(e.failures())
               }
        }
    }

    return <>
        <div style={{ textAlign: 'center' }}> <EuiTitle size="s"><p>Referral Riddle</p></EuiTitle></div>

        {(message !== '' && message != undefined) && <EuiCallOut iconType='success' >{`${message}...`}</EuiCallOut>}
        <EuiPage color="green" restrictWidth>
            <EuiCard
                title=""
                description={<><EuiIcon size="xxl" type="securityApp" />
                    <EuiText size="s" style={{ color: 'black' }}>Login in to <span style={{ color: 'limegreen' }}>Referral Riddle</span></EuiText>
                </>}
                footer={
                    <div>
                       {(failures.length>0 ) && <EuiCallOut size="s" title="Sorry, there was an error" color="danger"
                             iconType={"error"}>
                                {failures.length>0 && failures.map((failure,idx)=>{
                                    return <><EuiFormErrorText key={idx}>{failure.message}</EuiFormErrorText></>
                                })}
                                </EuiCallOut>}
                        <EuiForm component='form' onSubmit={handleSubmit(onLogin)} >
                            <EuiFlexGroup gutterSize='s' >
                                <EuiFlexItem></EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFormRow isInvalid={!!errors.email} error={<EuiFormErrorText style={{
                                        marginTop: '10px'
                                    }}>{errors.email?.message}</EuiFormErrorText>} label='Enter Email: ' >
                                        <EuiFieldText compressed placeholder="Email"
                                            isInvalid={!!errors.email}
                                            {...register('email', { required: 'Email should not be empty!' })}
                                            onChange={e => {
                                                setValue('email', e.target.value)
                                                clearErrors()
                                            }}
                                        />
                                    </EuiFormRow>
                                    <EuiSpacer />
                                    <>
                                        <EuiFormRow isInvalid={!!errors.password} error={<EuiFormErrorText style={{
                                            marginTop: '10px'
                                        }}>{errors.password?.message}</EuiFormErrorText>} label="Enter Password: " >
                                            <EuiFieldText compressed type='password' placeholder="Password"
                                                isInvalid={!!errors.password}
                                                {...register('password', { required: 'Password should not be empty!' })}
                                                onChange={e => {
                                                    setValue('password', e.target.value)
                                                    clearErrors()
                                                }}
                                            />
                                        </EuiFormRow>
                                    </>
                                    <EuiSpacer />
                                </EuiFlexItem>
                                <EuiFlexItem />

                            </EuiFlexGroup>


                            <EuiSpacer />
                            <EuiButton type="submit" size="s">Log In</EuiButton>
                        </EuiForm>

                        <EuiSpacer size="s" />
                        <EuiButtonEmpty href="/signup" size="xs" color="primary" >New User ?</EuiButtonEmpty>
                    </div>

                }
            />
        </EuiPage></>
}

export default LoginPage