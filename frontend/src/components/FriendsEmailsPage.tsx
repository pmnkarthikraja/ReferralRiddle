import { EuiBasicTable, EuiBasicTableColumn, EuiButton, EuiButtonEmpty, EuiCopy, EuiFlexGroup, EuiFlexItem, EuiHeaderLink, EuiHealth, EuiIcon, EuiLink, EuiLoadingChart, EuiPage, EuiPageBody, EuiPageSection, EuiProgress, EuiSpacer, EuiText, EuiTitle } from "@elastic/eui"
import { EmailWithReferee, Referee } from "./emailApi"
import { useEmail } from "./useEmail"
import ToastErrors from "./ToastError";
import LoadingScreen from "./LoadingScreen";
import React from "react";



const columns = [
    {
        field: 'address',
        name: 'Friend\'s Email Address', // Updated column name
        sortable: true,
        render: (address: string) => 
        <>
        <EuiIcon size='l' type='email' /> 
        <EuiLink href="#" style={{textDecoration:'none'}} color='success'>{address}</EuiLink>
            </>
    },
    {
        name: "Referees",
        actions: [
            {
                name: 'Referee-Email-Code',
                description: 'you can copy referralcode here',
                render: (r: EmailWithReferee) => <>
                    {r.referees.map((ref, idx) => {
                        return <>
                            <EuiFlexGroup key={idx} gutterSize='none'>
                                <EuiFlexItem>
                                    <EuiText>{ref.email}</EuiText>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiCopy textToCopy={ref.referralCode}>
                                        {(copy) => (
                                            <EuiButton size="s" fill color="success" onClick={copy}>{ref.referralCode}</EuiButton>
                                        )}
                                    </EuiCopy>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                            <EuiSpacer size='s' />
                        </>
                    })}

                </>
            },
        ]
    },
];



const FriendsEmailsPage = () => {
    const {emails,apiError,loading} = useEmail()
    const items: EmailWithReferee[] = emails.map(email => {
        return email
    })

    if (loading){
        return  <React.Fragment>
        <LoadingScreen />
        {!!apiError && <ToastErrors errors={[apiError]} />}
        </React.Fragment> 
    }

    return <>
    {!!apiError && <ToastErrors errors={[apiError]} />}
        <EuiPage restrictWidth>
            <EuiPageBody>
                <EuiPageBody verticalPosition="center" horizontalPosition="center">
                    <EuiPageSection>
                        
                        <EuiTitle size="l">
                            <h1>Friend's Emails and Referees</h1>
                        </EuiTitle>
                        <EuiIcon type="logoElastic" size="xxl" />
                       
                        <EuiBasicTable
                            items={items}
                            columns={columns}
                            compressed={true}
                        />
                    </EuiPageSection>
                </EuiPageBody>
            </EuiPageBody>
        </EuiPage>
    </>
}

export default FriendsEmailsPage