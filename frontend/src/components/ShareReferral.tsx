import { FunctionComponent, useEffect, useState } from "react"
import { EmailStruct, UserDetail } from "./dataStructure"
import {  EuiBasicTableColumn, EuiButton, EuiButtonEmpty, EuiCallOut, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiIcon, EuiInMemoryTable, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiSpacer, EuiTableSelectionType, EuiText } from "@elastic/eui"
import { useEmail } from "./useEmail"
import { emailApi } from "./emailApi"

export interface ShareReferralProps {
    user: UserDetail
}

const columns: Array<EuiBasicTableColumn<EmailStruct>> = [{
    field: 'address',
    name: 'FriendsEmails'
}]

const ShareReferral: FunctionComponent<ShareReferralProps> = ({
    user
}) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [selection,setSelection]=useState<EmailStruct[]>([])
    const [customMail,setCustomMail]=useState<string>('')
    const [successMsg,setSuccessMsg] = useState<string>('')
    const emails = useEmail()
    const items: EmailStruct[] = emails.emails.map(email => {
        return {
            address: email.address
        }
    })

    const sendEmail = (custom:boolean)=>{
        try{
            if (!!user.ownReferralCode){
                const res = emailApi.sendCode(user.email,user.ownReferralCode,custom?[{address:customMail}]:selection)
                res.then((r)=>{
                    setSelection([])
                    console.log("success",r.data)
                    setSuccessMsg(r.data.message)
                    return 
                }).catch(e=>{
                    console.log("error ",e)
                })
            }
        }catch(e){}
    }

    const sendButton =
    selection.length > 0 ? (
      <EuiButton color='success' iconType='share' onClick={()=>sendEmail(false)}>
        Send Code to {selection.length} Friends
      </EuiButton>
    ) : null;


    const selectionValue: EuiTableSelectionType<EmailStruct> = {
        selectable: (user) => true,
        onSelectionChange: (selection) => setSelection(selection),
        initialSelected: [],
      };

    console.log("custom mail ",customMail)
    return <>

        <EuiButtonEmpty onClick={() => { setModalOpen(true) }}>Share Referral Code</EuiButtonEmpty>
        <EuiSpacer />

        {isModalOpen && <EuiModal onClose={() => setModalOpen(false)}>
            {successMsg != '' && <EuiCallOut color='success'>{successMsg}</EuiCallOut>}
            <EuiModalHeader>
                <EuiModalHeaderTitle >
                    Share Referral <EuiIcon size='xxl' type={'createPopulationJob'} />
                </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
                <EuiText style={{ color: 'green' }}>your referral code:  <EuiButton fill={true}>{user.ownReferralCode}</EuiButton></EuiText>
                you wanna send this code to your friends!!?
                <EuiSpacer />
                {<EuiInMemoryTable   itemId={"address"} selection={customMail.length>0 ? undefined : selectionValue} isSelectable={false} compressed columns={columns} items={items} />}
               <>
               <EuiText><p>Or, Enter Email</p></EuiText>
               {<EuiForm component='form' onSubmit={(e)=>{
                e.preventDefault()
                sendEmail(true)
               }}>

                <EuiFlexGroup>
                    <EuiFlexItem>
                    <EuiFieldText disabled={selection.length>0} onChange={(e)=>{
                        setCustomMail(e.target.value)
                    }
                        
                        } placeholder="Enter Email.."  compressed fullWidth></EuiFieldText>
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
export default ShareReferral