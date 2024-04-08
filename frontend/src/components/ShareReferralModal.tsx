import { EuiBasicTableColumn, EuiButton, EuiButtonEmpty, EuiCallOut, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormErrorText, EuiFormRow, EuiIcon, EuiInMemoryTable, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiSpacer, EuiTableSelectionType, EuiText, EuiTitle } from "@elastic/eui"
import React, { FunctionComponent, useState } from "react"
import { EmailStruct, UserDetail } from "../schema/dataStructure"
import { useGetEmails, useSendEmailMutation } from "../hooks/hooks"
import LoadingIcon from "./LoadingIcon"
import { define, create, validate, pattern, string, assert, StructError, Failure } from "superstruct"
import { emailRefinement } from "../schema/schema"


export interface ShareReferralProps {
    user: UserDetail
}

const columns: Array<EuiBasicTableColumn<EmailStruct>> = [{
    field: 'address',
    name: 'FriendsEmails'
}]

const ShareReferralModal: FunctionComponent<ShareReferralProps> = ({
    user
}) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [selection,setSelection]=useState<EmailStruct[]>([])
    const [customMail,setCustomMail]=useState<string>('')
    const [successMsg,setSuccessMsg] = useState<string>('')
    const [failures,setFailures]=useState<Failure[]>([])
    const emailsQuery = useGetEmails()

        const items: EmailStruct[] = emailsQuery.data?.map(email => {
        return {
            address: email.address
        }
        }) || []

        const {mutateAsync:sendEmailMutation,isLoading,isPaused,isError,error} = useSendEmailMutation()

    const sendEmail = async (custom: boolean) => {
        try {
            if (!!user.ownReferralCode && failures.length==0) {
                await assert(customMail,emailRefinement)
                const payload = custom ? [{ address: customMail }] : selection;
                await sendEmailMutation({from:user.email,referralCode:user.ownReferralCode,addresses:payload});
                setSelection([]);
                setSuccessMsg("Email(s) sent successfully!");
            }
        } catch (error) {
            console.error('Error sending email:', error);
            if (error instanceof StructError){
                setFailures(error.failures())
            }
        }
    };

    const sendButton =
    selection.length > 0 ? (
      <EuiButton color='success' iconType='share' onClick={()=>sendEmail(false)}>
        Send Code to {selection.length} Friends
      </EuiButton>
    ) : null;


    const selectionValue: EuiTableSelectionType<EmailStruct> = {
        selectable: (user) => true,
        onSelectionChange: (selection) => {setSelection(selection);setSuccessMsg('')},
        initialSelected: [],
      };

    function onClose(){
        setModalOpen(false)
        setSelection([])
        setSuccessMsg('')
        setCustomMail('')
        setFailures([])
    }

    return <React.Fragment>
        <EuiButtonEmpty onClick={() => { setModalOpen(true) }}>Share Referral Code</EuiButtonEmpty>
        <EuiSpacer />

        {isModalOpen && <EuiModal onClose={onClose}>
            {successMsg != '' && <EuiCallOut color='success'>{successMsg}</EuiCallOut>}
            {isError && error && !isPaused && <EuiCallOut title="Oops!" color="danger">{error.response?.data.message || 'Network Error'}</EuiCallOut>}
            {failures.length>0 && <EuiCallOut color="warning"><EuiFormErrorText>{failures[0].message}</EuiFormErrorText></EuiCallOut>}
            {isLoading &&<LoadingIcon/>}
            <EuiModalHeader>
                <EuiModalHeaderTitle >
                    Share Referral <EuiIcon size='xxl' type={'createPopulationJob'} />
                </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
                <EuiText style={{ color: 'green' }}>Your referral code:  <EuiButton fill={true}>{user.ownReferralCode}</EuiButton></EuiText>
                you wanna send this code to your friends!!?
                <EuiSpacer />
                {<EuiInMemoryTable   itemId={"address"} selection={customMail.length>0 ? undefined : selectionValue} isSelectable={false} compressed columns={columns} items={items} />}
               <React.Fragment>
               <EuiSpacer />
               <EuiText size='m'><p>or, Enter custom Email:</p></EuiText>
                <EuiFlexGroup>
                    <EuiFlexItem>
                    <EuiFieldText  type="email" disabled={selection.length>0} 
                    onChange={(e)=>{
                        setCustomMail(e.target.value)
                        setSuccessMsg('')
                        setFailures([])
                    }
                        } placeholder="Enter Email.."  fullWidth></EuiFieldText>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                    <EuiButton disabled={selection.length>0} onClick={()=>sendEmail(true)}>Send Custom Email</EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>
               </React.Fragment>
            </EuiModalBody>
            <EuiModalFooter>
            {sendButton}
            </EuiModalFooter>
           
        </EuiModal>}
    </React.Fragment>
}
export default ShareReferralModal