import { EuiButton, EuiButtonEmpty, EuiCallOut, EuiCard, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormErrorText, EuiFormRow, EuiIcon, EuiLoadingChart, EuiPage, EuiPageBody, EuiPageHeader, EuiPageSection, EuiSpacer, EuiText, EuiTitle } from "@elastic/eui"
import { FunctionComponent, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Failure, StructError, assert } from "superstruct"
import { UserLogin } from "./dataStructure"
import { useLoginMutation } from "./hooks"
import { userLoginSchema } from "./schema"
import LoadingScreen from "./LoadingScreen"
import LoadingIcon from "./LoadingIcon"


const LoginPage: FunctionComponent = () => {
    const { handleSubmit, register, setValue, formState: { errors }, clearErrors } = useForm<UserLogin>()
    const { isLoading, isError, error, mutateAsync: loginMutation } = useLoginMutation()
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [failures, setFailures] = useState<Failure[]>([])

    const onLogin = async (loginDetail: UserLogin) => {
        try {
            setFailures([])
            assert(loginDetail, userLoginSchema)
            await loginMutation(loginDetail)
            clearErrors()
            setSuccessMessage("Login Successfull. Redirecting to homepage...")
            setTimeout(() => {
                navigate('/')
            }, 2500)

        } catch (e) {
            if (e instanceof StructError) {
                setFailures(e.failures())
                return
            }
        }
    }

    return <>
        <div style={{textAlign:'center'}}>
       <EuiTitle  size="s"><p>Referral Riddle</p></EuiTitle>
       </div>
       <EuiSpacer />
        {isLoading && <LoadingIcon />}
        <EuiPage restrictWidth >
       <EuiPageBody>
            <EuiPageSection>
            <EuiCard
                title=""
                description={<><EuiIcon size="xxl" type="securityApp" />
                    <EuiText size="s" style={{ color: 'black' }}>Login in to <span style={{ color: 'limegreen' }}>Referral Riddle</span></EuiText>
                </>}
                footer={
                    <div>
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
                                                clearErrors('email')
                                            }}
                                        />
                                    </EuiFormRow>
                                    <EuiSpacer />
                                
                                        <EuiFormRow isInvalid={!!errors.password} error={<EuiFormErrorText style={{
                                            marginTop: '10px'
                                        }}>{errors.password?.message}</EuiFormErrorText>} label="Enter Password: " >
                                            <EuiFieldText compressed type='password' placeholder="Password"
                                                isInvalid={!!errors.password}
                                                {...register('password', { required: 'Password should not be empty!' })}
                                                onChange={e => {
                                                    setValue('password', e.target.value)
                                                    clearErrors('password')
                                                }}
                                            />
                                        </EuiFormRow>
                                  
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
            </EuiPageSection>
            </EuiPageBody>
        </EuiPage></>
}

export default LoginPage