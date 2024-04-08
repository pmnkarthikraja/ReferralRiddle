import { EuiBasicTableColumn, EuiButton, EuiButtonEmpty, EuiCallOut, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiIcon, EuiInMemoryTable, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiSpacer, EuiTableSelectionType, EuiText, EuiTitle } from "@elastic/eui"
import { FunctionComponent, useState } from "react"
import { EmailStruct, UserDetail } from "../schema/dataStructure"
import { useGetEmails, useSendEmailMutation } from "../hooks/hooks"
import LoadingIcon from "./LoadingIcon"

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

    const emailsQuery = useGetEmails()

        const items: EmailStruct[] = emailsQuery.data?.map(email => {
        return {
            address: email.address
        }
        }) || []

        const {mutateAsync:sendEmailMutation,isLoading,isError,error} = useSendEmailMutation()

    const sendEmail = async (custom: boolean) => {
        try {
            if (!!user.ownReferralCode) {
                const payload = custom ? [{ address: customMail }] : selection;
                console.log("addresses:",payload, user)
                await sendEmailMutation({from:user.email,referralCode:user.ownReferralCode,addresses:payload});
                setSelection([]);
                setSuccessMsg("Email(s) sent successfully!");
            }
        } catch (error) {
            console.error('Error sending email:', error);
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
    }

    return <>

        <EuiButtonEmpty onClick={() => { setModalOpen(true) }}>Share Referral Code</EuiButtonEmpty>
        <EuiSpacer />

        {isModalOpen && <EuiModal onClose={onClose}>
            {successMsg != '' && <EuiCallOut color='success'>{successMsg}</EuiCallOut>}
            {isError && error && <EuiCallOut title="Oops!" color="danger">{error.response?.data.message || 'Network Error'}</EuiCallOut>}
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
               <>
               <EuiSpacer />
               <EuiText size='m'><p>or, Enter custom Email:</p></EuiText>
               {<EuiForm component='form' onSubmit={(e)=>{
                e.preventDefault()
                sendEmail(true)
               }}>

                <EuiFlexGroup>
                    <EuiFlexItem>
                    <EuiFieldText  type="email" disabled={selection.length>0} onChange={(e)=>{
                        setCustomMail(e.target.value)
                        setSuccessMsg('')
                    }
                        } placeholder="Enter Email.."  fullWidth></EuiFieldText>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                    <EuiButton disabled={selection.length>0} type="submit">Send Custom Email</EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>
           
               </EuiForm>}
               </>
            </EuiModalBody>
            <EuiModalFooter>
            {sendButton}
            </EuiModalFooter>
           
        </EuiModal>}
    </>
}
export default ShareReferralModal