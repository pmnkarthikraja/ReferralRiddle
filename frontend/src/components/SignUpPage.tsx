import { EuiButton, EuiButtonEmpty, EuiCallOut, EuiCard, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiIcon, EuiPage, EuiPageSection, EuiPanel, EuiSpacer, EuiText, EuiTitle, useDependentState } from "@elastic/eui"
import React, { FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import { userApi } from "./userApi"
import { UserDetail } from "./dataStructure"
import axios, { AxiosError } from "axios"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { generateRandomReferralCode } from "./generateReferral"


const SignUpPage: FunctionComponent = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors }, resetField } = useForm<UserDetail>();
    const [err, setErr] = useState<string>()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const onRegister = async (userDetail: UserDetail) => {
        try {
            setErr(undefined)
            setIsLoading(true)
            //create unique referral code
            const referralCode = generateRandomReferralCode()

            let userDetailWithReferral = {...userDetail,ownReferralCode:referralCode} //generate unique referralcode
            if (userDetail.opReferralCode==undefined){
                userDetailWithReferral = {...userDetail, opReferralCode:'', ownReferralCode:referralCode}
            }
            const res = await userApi.onRegister(userDetailWithReferral)
            if (res.status == 201) {
                const { message, success } = res.data
                if (success) {
                    setTimeout(() => {
                        navigate('/') //navigating to the homepage
                        setIsLoading(false)
                    }, 500)
                } else {
                    setErr(message)
                }
            }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log("err", e.response?.data?.message)
                setErr(e.response?.data.message)
                return
            }
        }
    }

    const isError = errors.userName || errors.email || errors.phone || errors.ownReferralCode
    return <>
        <div style={{ textAlign: 'center' }}> <EuiTitle size="s"><p>Referral Riddle</p></EuiTitle></div>
        {isLoading && <>loading....</>}
        <EuiPage className="">
            <EuiPageSection>
                <EuiCard
                    title=""
                    description={
                        <React.Fragment>
                            
                            <EuiIcon size="xxl" type="dashboardApp" />
                            <EuiText size="s" style={{ color: 'black' }}>
                                <h3>Create a new account</h3>
                            </EuiText>
                            {isError && <EuiCallOut size='s' title="Sorry, there was an error" color="danger" iconType="error">
                                {Object.entries(errors).map(([_, value], idx) => (
                                    <p key={idx}>{value.message}</p>
                                ))}
                            </EuiCallOut>}

                            {!!err && <EuiCallOut size='s' title={err} color="danger" iconType="error">
                            </EuiCallOut>}

                            
                            <EuiForm component='form' onSubmit={handleSubmit(onRegister)}>
                                <EuiFlexGroup>
                                    <EuiFlexItem/>
                                    <EuiFlexItem>
                                    <EuiFieldText placeholder="User Name" fullWidth
                                    {...register('userName', { required: 'User Name required' })}
                                    onChange={(e) => { setValue('userName', e.target.value) }} />
                                <EuiSpacer size="s" />

                                <EuiFieldText type='email' placeholder="Email" fullWidth
                                    {...register('email', { required: 'Email required' })}
                                    onChange={(e) => { setValue('email', e.target.value) }} />
                                <EuiSpacer size="s" />

                                <EuiFieldText placeholder="Phone" fullWidth
                                    {...register('phone', { required: 'Phone Number required' })}
                                    onChange={(e) => { setValue('phone', e.target.value) }} />
                                <EuiSpacer size="s" />

                                <EuiFieldText type="password" placeholder="Set Password" fullWidth
                                    {...register('password', { required: 'Password required' })}
                                    onChange={(e) => { setValue('password', e.target.value) }} />
                                <EuiSpacer size="s" />


                                <EuiFieldText fullWidth isInvalid={!!errors.ownReferralCode} 
                                placeholder="Referral Code? (optional)" 
                                onChange={(e) => { setValue('opReferralCode', e.target.value) }} />

                                    </EuiFlexItem>
                                    <EuiFlexItem grow={true}/>
                                </EuiFlexGroup>
                               
                                <EuiSpacer size="s" />
                                <EuiSpacer />

                                {/* register and reset button */}
                                <EuiButtonEmpty href="/emails" style={{ textDecoration: 'none' }}  size="xs"><EuiIcon type={'email'}/> Find your Referral Code ?</EuiButtonEmpty> 
                                <EuiSpacer size="s"/>
                                
                                <EuiButton type="submit" color='success' size="s">Register</EuiButton>
                                <EuiButtonEmpty type="reset" onClick={() => {
                                    reset()
                                    setErr(undefined)
                                }} color='warning' size="s">Reset</EuiButtonEmpty>

                                <EuiSpacer />
                                <div>
                                    <EuiButtonEmpty style={{ textDecoration: 'none' }} href="/login" type='button' color='primary' size="s">Already have an account ?</EuiButtonEmpty>
                                </div>
                            </EuiForm>
                        </React.Fragment>}

                />
            </EuiPageSection>
        </EuiPage></>

}

export default SignUpPage