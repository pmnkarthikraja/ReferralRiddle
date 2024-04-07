import { EuiButton, EuiButtonEmpty, EuiCallOut, EuiCard, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiIcon, EuiPage, EuiSpacer, EuiText, EuiTitle } from "@elastic/eui"
import { FunctionComponent, useState } from 'react'
import { useForm } from "react-hook-form"
import { UserLogin } from "./dataStructure"
import { userApi } from "./userApi"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const LoginPage: FunctionComponent = () => {
    const { handleSubmit, register, setValue } = useForm<UserLogin>()
    const [message, setMessage] = useState<string>('')
    const navigate = useNavigate()

    const onLogin = async (loginDetail: UserLogin) => {
        try {
            setMessage('')
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
            if (axios.isAxiosError(e)) {
                setMessage(e.response?.data.message)
                return
            }
        }
    }

    return <>
        <div style={{ textAlign: 'center' }}> <EuiTitle size="s"><p>Referral Riddle</p></EuiTitle></div>

        {message !== '' && <EuiCallOut iconType='success' >{`${message}...`}</EuiCallOut>}
        <EuiPage color="green" restrictWidth>
            <EuiCard
                title=""
                description={<><EuiIcon size="xxl" type="securityApp" />
                    <EuiText size="s" style={{ color: 'black' }}>Login in to <span style={{ color: 'limegreen' }}>Referral Riddle</span></EuiText>
                </>}
                footer={
                    <div>
                        <EuiForm component='form' onSubmit={handleSubmit(onLogin)}>
                            <EuiFlexGroup>
                                <EuiFlexItem></EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFieldText type="email" placeholder="Email"
                                        {...register('email', { required: 'Email should not be empty!' })}
                                        onChange={e => setValue('email', e.target.value)}
                                    />
                                    <EuiSpacer size="s" />

                                    <EuiFieldText type='password' placeholder="Password"
                                        {...register('password', { required: 'Password should not be empty!' })}
                                        onChange={e => setValue('password', e.target.value)}
                                    />
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