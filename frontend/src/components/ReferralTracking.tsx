import { EuiBasicTableColumn, EuiButton, EuiFlexGroup, EuiFlexItem, EuiHealth, EuiInMemoryTable, EuiPanel, EuiProgress, EuiProvider, EuiSkeletonCircle, EuiSkeletonLoading, EuiSkeletonRectangle, EuiSkeletonText, EuiSkeletonTitle, EuiSpacer, EuiText, EuiTitle } from "@elastic/eui"
import { FunctionComponent } from "react"
import { UserDetail } from "./dataStructure"
import { useUsers } from "./useUsers"
import { useUsersTracking } from "./useUsersTracking"
import { useGetUsers } from "./hooks"

export interface ReferralTrackingProps {
    user: UserDetail
}

export type ReferralStatus = 'Pending' | 'Success' | 'Failed'

export interface ReferralTrack {
    email: string,
    status: ReferralStatus
}

const columns: Array<EuiBasicTableColumn<ReferralTrack>> = [{
    field: 'email',
    name: 'Referred Email'
}, {
    name: 'Status',
    render: (refTrack: ReferralTrack) => <>
        {
            refTrack.status == 'Success' &&
            <EuiHealth color="success">
                <EuiButton fill color='success' >Success</EuiButton>
            </EuiHealth>
        }
        {
            refTrack.status == 'Pending' &&
            <EuiHealth color='warning'>
                <EuiButton fill color='warning' >Pending</EuiButton>
            </EuiHealth>
        }
        {
            refTrack.status == 'Failed' &&
            <EuiHealth color='danger'>
                <EuiButton fill color='danger' >Failed</EuiButton>
            </EuiHealth>
        }
    </>
}, {
    name: 'Description',
    render: (refTrack: ReferralTrack) =>
        <>
            {
                refTrack.status == 'Success' &&
                <EuiText color='success' size="s" >User Signed up by using your referral code</EuiText>
            }
            {
                refTrack.status == 'Pending' &&
                <EuiText color='success' size="s" >User still not signed up</EuiText>
            }
            {
                refTrack.status == 'Failed' &&
                <EuiText color='success' size="s" >User Signed up by without your referral code</EuiText>
            }
        </>

}]

const ReferralTracking: FunctionComponent<ReferralTrackingProps> = ({
    user
}) => {
    const {data,isLoading,isFetching} = useGetUsers()
    // const { isLoading, userDetails } = useUsers()
    const referralTracks = useUsersTracking(user)

    return <>
    <EuiProvider>
        <EuiTitle><h2>Tracking Users</h2></EuiTitle>
        {(isLoading ) && <EuiProgress size="xs" color="accent" />}
        <EuiSkeletonLoading loadedContent={
            <EuiInMemoryTable pagination={true} compressed columns={columns} items={referralTracks} />
        } loadingContent={
            <EuiPanel>
                <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
                    <EuiFlexItem grow={false}>
                        <EuiSkeletonCircle size="s" />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiSkeletonTitle size="l" />
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer size="s" />
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <EuiSkeletonText lines={5} />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiSkeletonRectangle width="100%" height={148} />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiPanel>
            
        } isLoading={isLoading} /></EuiProvider>
    </>
}
export default ReferralTracking