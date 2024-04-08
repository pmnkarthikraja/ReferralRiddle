import { EuiButton, EuiButtonEmpty, EuiCallOut, EuiCard, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormErrorText, EuiFormRow, EuiIcon, EuiLoadingChart, EuiPage, EuiPageSection, EuiSpacer, EuiText, EuiTitle } from "@elastic/eui"
import React, { FunctionComponent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Failure, StructError, assert } from "superstruct"
import { UserDetail } from "../schema/dataStructure"
import { generateRandomReferralCode } from "./generateReferral"
import { useRegisterMutation } from "../hooks/hooks"
import { userDetailSchema } from "../schema/schema"
import { useNavigate } from "react-router-dom"


const SignUpPage: FunctionComponent = () => {
    const { register, handleSubmit, setValue, reset, clearErrors, formState: { errors }, } = useForm<UserDetail>();
    const [failures, setFailures] = useState<Failure[]>([])
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { isLoading, isError, error, mutateAsync: registerMutation } = useRegisterMutation()
    const navigate = useNavigate()

    const onRegister = async (userDetail: UserDetail) => {
        const referralCode = generateRandomReferralCode()
        let userDetailWithReferral = { ...userDetail, ownReferralCode: referralCode } //generate unique referralcode
        if (userDetail.opReferralCode == undefined) {
            userDetailWithReferral = { ...userDetail, opReferralCode: '', ownReferralCode: referralCode }
        }

        try {
            setFailures([])
            assert(userDetail, userDetailSchema)
            await registerMutation(userDetailWithReferral)
            clearErrors();
            reset()
            setSuccessMessage("Registration Successfull. Redirecting to homepage...")
            setTimeout(() => {
                // Navigate to the homepage
                navigate('/');
              }, 1500);
          
        } catch (e) {
            if (e instanceof StructError) {
                setFailures(e.failures())
                return
            }
        }
    }

return <React.Fragment>
        <div style={{ textAlign: 'center' }}> <EuiTitle size="s"><p>Referral Riddle</p></EuiTitle></div>
        {isLoading && <EuiLoadingChart size="xl" />}
        <EuiPage >
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
                            {successMessage && <EuiCallOut color="success" iconType={'success'}>{successMessage}</EuiCallOut>}

                            {(failures.length > 0 || isError) && (
                                <EuiCallOut size="s" title="Sorry, there was an error" color="danger" iconType="alert">
                                    {failures.length > 0 &&
                                        failures.map((failure, idx) => (
                                            <EuiFormErrorText key={idx}>{failure.message}</EuiFormErrorText>
                                        ))}

                                    {isError && error && <EuiFormErrorText>{error.response?.data.message || 'Network Error'}</EuiFormErrorText>}
                                </EuiCallOut>
                            )}

                            <EuiForm component='form' onSubmit={handleSubmit(onRegister)}>
                                <EuiFlexGroup>
                                    <EuiFlexItem />
                                    <EuiFlexItem>
                                        <EuiFormRow isInvalid={!!errors.userName} error={<EuiFormErrorText style={{
                                            marginTop: '10px'
                                        }}>{errors.userName?.message}</EuiFormErrorText>} label="Enter User Name:">
                                            <EuiFieldText isInvalid={!!errors.userName} compressed placeholder="User Name" fullWidth
                                                {...register('userName', { required: 'User Name required' })}
                                                onChange={(e) => { setValue('userName', e.target.value); clearErrors('userName') }} />
                                        </EuiFormRow>
                                        <EuiSpacer />

                                        <EuiFormRow isInvalid={!!errors.email} error={<EuiFormErrorText style={{
                                            marginTop: '10px'
                                        }}>{errors.email?.message}</EuiFormErrorText>} label="Enter Email:">
                                            <EuiFieldText isInvalid={!!errors.email} compressed placeholder="Email" fullWidth
                                                {...register('email', { required: 'Email required' })}
                                                onChange={(e) => { setValue('email', e.target.value); clearErrors('email') }} />
                                        </EuiFormRow>
                                        <EuiSpacer />

                                        <EuiFormRow isInvalid={!!errors.phone} error={<EuiFormErrorText style={{
                                            marginTop: '10px'
                                        }}>{errors.phone?.message}</EuiFormErrorText>} label="Enter Phone:">
                                            <EuiFieldText isInvalid={!!errors.phone} compressed placeholder="Phone" fullWidth
                                                {...register('phone', { required: 'Phone Number required' })}
                                                onChange={(e) => { setValue('phone', e.target.value); clearErrors('phone') }} />
                                        </EuiFormRow>
                                        <EuiSpacer />

                                        <EuiFormRow isInvalid={!!errors.password} error={<EuiFormErrorText style={{
                                            marginTop: '10px'
                                        }}>{errors.password?.message}</EuiFormErrorText>} label="Set Password:">
                                            <EuiFieldText isInvalid={!!errors.password} compressed type="password" placeholder="Set Password" fullWidth
                                                {...register('password', { required: 'Password required' })}
                                                onChange={(e) => { setValue('password', e.target.value); clearErrors('password') }} />
                                        </EuiFormRow>
                                        <EuiSpacer />

                                        <EuiFormRow isInvalid={!!errors.opReferralCode} error={<EuiFormErrorText style={{
                                            marginTop: '10px'
                                        }}>{errors.opReferralCode?.message}</EuiFormErrorText>} label="Enter Referral Code (optional):">
                                            <EuiFieldText isInvalid={!!errors.opReferralCode} compressed fullWidth
                                                placeholder="Referral Code? (optional)"
                                                onChange={(e) => {
                                                    setValue('opReferralCode', e.target.value); if (e.target.value == '') {
                                                        setFailures([])
                                                        clearErrors('opReferralCode')
                                                    }
                                                }} />
                                        </EuiFormRow>

                                    </EuiFlexItem>
                                    <EuiFlexItem grow={true} />
                                </EuiFlexGroup>

                                <EuiSpacer size="s" />
                                <EuiSpacer />

                                {/* register and reset button */}
                                <EuiButtonEmpty href="/emails" style={{ textDecoration: 'none' }} size="xs"><EuiIcon type={'email'} /> Find your Referral Code ?</EuiButtonEmpty>
                                <EuiSpacer size="s" />

                                <EuiButton type="submit" fill color='success' size="s">Register</EuiButton>
                                <EuiButtonEmpty type="reset" onClick={() => {
                                    reset()
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
        </EuiPage>
        </React.Fragment>

}

export default SignUpPage