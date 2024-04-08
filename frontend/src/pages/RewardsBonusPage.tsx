import { EuiFlexGroup, EuiFlexItem, EuiLoadingLogo, EuiSpacer } from '@elastic/eui';
import React, { FunctionComponent, useEffect, useState } from 'react';
import PaperShower from '../components/PaperShower';
import ShowRewards from '../components/ShowRewards';
import { UserDetail } from '../schema/dataStructure';
import { useUsersTracking } from '../hooks/useUsersTracking';
import { useGetUsers } from '../hooks/hooks';

export interface RewardsBonusProps{
    currentUser:UserDetail
}

const RewardsBonusPage: FunctionComponent<RewardsBonusProps> = ({
    currentUser
}) => {
    const [paperShower,setPaperShower]=useState<boolean>(true)
    const {referralTracks,isEmailsLoading,isUsersLoading} = useUsersTracking(currentUser)    
    const {data} = useGetUsers()

useEffect(()=>{
    setTimeout(()=>{
        setPaperShower(false)
    },3000)

},[])

if (isEmailsLoading||isUsersLoading){
    return <React.Fragment> 
    <EuiSpacer size='xxl' />
     <EuiFlexGroup justifyContent='spaceEvenly'>
  <EuiFlexItem grow={false}>
  <EuiLoadingLogo  size='xl' logo= "logoObservability" /> Loading...
  </EuiFlexItem>
</EuiFlexGroup>
    </React.Fragment>
}

const successCount = referralTracks.filter(re=>re.status=='Success').length
const whoReferred= data?.find(d=>d.ownReferralCode==currentUser.opReferralCode)

  return (
   <React.Fragment>
   <ShowRewards hasUserReferredBySomeOne={currentUser.opReferralCode!==''} whoReferred={whoReferred}  rewardAmount={successCount*50} successfulReferrals={successCount} />
   {paperShower && <PaperShower/>}
   </React.Fragment>
  );
};

export default RewardsBonusPage;
