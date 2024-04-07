import { EuiBasicTable, EuiBasicTableColumn, EuiButton, EuiCopy, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiText, EuiTitle } from "@elastic/eui"
import { EmailWithReferee } from "./emailApi"
import { useEmail } from "./useEmail"





const columns: EuiBasicTableColumn<EmailWithReferee>[] = [
    {
        render: (a: EmailWithReferee) => <>{a.address}</>,
        name: 'Email Addresses'
    },
    {
        name: "Referees with code",
        actions: [
            {
                name: 'Referee-Email-Code',
                description:'you can copy referralcode here',
                render: (r: EmailWithReferee) => <>
                    {r.referees.map((ref, idx) => {
                        return <>
                            <EuiFlexGroup key={idx}>
                                <EuiFlexItem>
                                    <EuiText>{ref.email}</EuiText>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiCopy textToCopy={ref.referralCode}>
                                        {(copy) => (
                                            <EuiButton fill color="success" onClick={copy}>{ref.referralCode}</EuiButton>
                                        )}
                                    </EuiCopy>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiSpacer  size='s'/>
                        </>
                    })}

                </>
            },
        ]
    },
]



const FriendsEmails = () => {
    const emails = useEmail()
    if (emails.emails) {
        console.log("got emails", emails.emails)
    }
    const items: EmailWithReferee[] = emails.emails.map(email => {
        return email
    })

    return <>
        <EuiTitle>{<h2>Friends Mails given below..</h2>}</EuiTitle>
        {emails.emails && <EuiBasicTable columns={columns} items={items} />}
    </>
}

export default FriendsEmails