import { EuiButton, EuiButtonEmpty, EuiCallOut, EuiCard, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormErrorText, EuiFormRow, EuiIcon, EuiLoadingChart, EuiPage, EuiPageSection, EuiPanel, EuiSpacer, EuiText, EuiTitle, useDependentState } from "@elastic/eui"
import React, { FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import { userApi } from "./userApi"
import { UserDetail } from "./dataStructure"
import axios, { AxiosError } from "axios"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { generateRandomReferralCode } from "./generateReferral"
import { Failure, StructError, assert, is } from "superstruct"
import { userDetailSchema } from "./schema"


const SignUpPage: FunctionComponent = () => {
    const { register, handleSubmit, setValue, reset,clearErrors, formState: { errors }, } = useForm<UserDetail>();
    const [err, setErr] = useState<string>()
    const [failures,setFailures]=useState<Failure[]>([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


  
    const onRegister = async (userDetail: UserDetail) => {
        try{
            console.log("validating...")
            setFailures([])
            assert(userDetail,userDetailSchema)
            try {
                console.log("api calling")
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
                    const { success } = res.data
                    if (success) {
                        setTimeout(() => {
                            navigate('/') //navigating to the homepage
                            setIsLoading(false)
                        }, 500)
                    }
                }
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    console.log("err", e.response?.data?.message)
                    setErr(e.response?.data.message)
                    return
                }
            }
        }catch(e){
           if (e instanceof StructError){
            setFailures(e.failures())
            return
           }
        }
      
       
    }

    const isError = errors.userName || errors.email || errors.phone || errors.ownReferralCode
    return <>
        <div style={{ textAlign: 'center' }}> <EuiTitle size="s"><p>Referral Riddle</p></EuiTitle></div>
        {isLoading &&    <EuiLoadingChart size="xl" />}
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
                            <EuiSpacer />

                            {(failures.length>0 || isError) && <EuiCallOut size="s" title="Sorry, there was an error" color="danger"
                             iconType={"error"}>
                                {failures.length>0 && !isError && failures.map((failure,idx)=>{
                                    return <><EuiFormErrorText key={idx}>{failure.message}</EuiFormErrorText></>
                                })}
                                {isError && failures.length==0 && Object.entries(errors).map(([_, value], idx) => (
                                    <EuiFormErrorText key={idx}>{value.message}</EuiFormErrorText>
                                )) }
                                </EuiCallOut>}

                            {!!err && <EuiCallOut size='s' title={err} color="danger" iconType="error">
                            </EuiCallOut>}

                            
                            <EuiForm component='form' onSubmit={handleSubmit(onRegister)}>
                                <EuiFlexGroup>
                                    <EuiFlexItem/>
                                    <EuiFlexItem>
                                        <EuiFormRow isInvalid={!!errors.userName} error={<EuiFormErrorText style={{
                                            marginTop:'10px'
                                        }}>{errors.userName?.message}</EuiFormErrorText>}  label="Enter User Name:">
                                    <EuiFieldText isInvalid={!!errors.userName} compressed placeholder="User Name" fullWidth
                                    {...register('userName', { required: 'User Name required' })}
                                    onChange={(e) => { setValue('userName', e.target.value); clearErrors('userName') }} />
                                    </EuiFormRow>
                                <EuiSpacer  />

                                <EuiFormRow isInvalid={!!errors.email} error={<EuiFormErrorText style={{
                                            marginTop:'10px'
                                        }}>{errors.email?.message}</EuiFormErrorText>}  label="Enter Email:">
                                <EuiFieldText isInvalid={!!errors.email} compressed placeholder="Email" fullWidth
                                    {...register('email', { required: 'Email required' })}
                                    onChange={(e) => { setValue('email', e.target.value);clearErrors('email') }} />
                                    </EuiFormRow>
                                <EuiSpacer />

                            <EuiFormRow isInvalid={!!errors.phone} error={<EuiFormErrorText style={{
                                            marginTop:'10px'
                                        }}>{errors.phone?.message}</EuiFormErrorText>} label="Enter Phone:">
                                <EuiFieldText isInvalid={!!errors.phone} compressed placeholder="Phone" fullWidth
                                    {...register('phone', { required: 'Phone Number required' })}
                                    onChange={(e) => { setValue('phone', e.target.value);clearErrors('phone') }} />
                                    </EuiFormRow>
                                <EuiSpacer  />

                                <EuiFormRow isInvalid={!!errors.password} error={<EuiFormErrorText style={{
                                            marginTop:'10px'
                                        }}>{errors.password?.message}</EuiFormErrorText>} label="Set Password:">
                                <EuiFieldText isInvalid={!!errors.password} compressed type="password" placeholder="Set Password" fullWidth
                                    {...register('password', { required: 'Password required' })}
                                    onChange={(e) => { setValue('password', e.target.value);clearErrors('password') }} />
                                    </EuiFormRow>
                                <EuiSpacer  />

                                <EuiFormRow isInvalid={!!errors.opReferralCode} error={<EuiFormErrorText style={{
                                            marginTop:'10px'
                                        }}>{errors.opReferralCode?.message}</EuiFormErrorText>} label="Enter Referral Code (optional):">
                                <EuiFieldText isInvalid={!!errors.opReferralCode} compressed fullWidth  
                                placeholder="Referral Code? (optional)" 
                                onChange={(e) => { setValue('opReferralCode', e.target.value);clearErrors('opReferralCode') }} />
                                </EuiFormRow>

                                    </EuiFlexItem>
                                    <EuiFlexItem grow={true}/>
                                </EuiFlexGroup>
                               
                                <EuiSpacer size="s" />
                                <EuiSpacer />

                                {/* register and reset button */}
                                <EuiButtonEmpty href="/emails" style={{ textDecoration: 'none' }}  size="xs"><EuiIcon type={'email'}/> Find your Referral Code ?</EuiButtonEmpty> 
                                <EuiSpacer size="s"/>
                                
                                <EuiButton type="submit" fill color='success' size="s">Register</EuiButton>
                                <EuiButtonEmpty  type="reset" onClick={() => {
                                    reset()
                                    setErr(undefined)
                                    setFailures([])
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