import { EuiButton, EuiCopy, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiInMemoryTable, EuiLink, EuiPage, EuiPageBody, EuiPageSection, EuiSpacer, EuiText, EuiTitle } from "@elastic/eui";
import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import AxiosErrorToast from "../components/ToastError";
import { EmailWithReferee } from "../api/emailApi";
import { useGetEmails } from "../hooks/hooks";



const columns = [
    {
        field: 'address',
        name: 'Friend\'s Email Address', // Updated column name
        sortable: true,
        render: (address: string) => 
        <React.Fragment>
        <EuiIcon size='l' type='email' />
        <EuiLink href="#" style={{textDecoration:'none',marginLeft:'10px'}} color='success'>{address}</EuiLink>
            </React.Fragment>
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
                                            <EuiButton size="s"  color="success" onClick={copy}>{ref.referralCode}</EuiButton>
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
    const {data:allEmails,isLoading,isError,error} = useGetEmails(3000)
    const items: EmailWithReferee[] | undefined = allEmails?.map(email => {
        return email
    }) 

    if (isLoading){
        return  <React.Fragment>
        <LoadingScreen />
        {error && <AxiosErrorToast error={error} />}
        </React.Fragment> 
    }

    return <>
    {isError && error && <AxiosErrorToast error={error} />}
        <EuiPage restrictWidth>
            <EuiPageBody>
                <EuiPageBody verticalPosition="center" horizontalPosition="center">
                    <EuiPageSection>
                        
                        <EuiTitle size="l">
                            <h1>Friend's Emails and Referees</h1>
                        </EuiTitle>
                        <EuiIcon type="logoElastic" size="xxl" />
                       
                        <EuiInMemoryTable
                            items={items||[]}
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