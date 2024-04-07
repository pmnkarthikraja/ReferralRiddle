import React, { FunctionComponent, useEffect, useState } from 'react';
import PaperShower from './PaperShower';
import { useUsersTracking } from './useUsersTracking';
import { useUsers } from './useUsers';
import { UserDetail } from './dataStructure';
import { EuiSpacer, EuiFlexGroup, EuiFlexItem, EuiLoadingLogo, EuiText } from '@elastic/eui';

export interface RewardsBonusProps{
    currentUser:UserDetail
}

const RewardsBonus: FunctionComponent<RewardsBonusProps> = ({
    currentUser
}) => {
    const [paperShower,setPaperShower]=useState<boolean>(true)
    const {isLoading,userDetails} = useUsers()
    const trackageData = useUsersTracking(currentUser,userDetails)

useEffect(()=>{
    setTimeout(()=>{
        setPaperShower(false)
    },3000)

},[])


if (isLoading){
    return <> 
    <EuiSpacer size='xxl' />
     <EuiFlexGroup justifyContent='spaceEvenly'>
  <EuiFlexItem grow={false}>
  <EuiLoadingLogo  size='xl' logo=  "logoObservability" /> Loading...
  </EuiFlexItem>
</EuiFlexGroup>
    </>
}


const successCount = trackageData.filter(r=>r.status=='Success').length

  return (
   <>welcome to RewardsBonus
   {paperShower && <PaperShower/>}
   <EuiText>{successCount} user signed out by using your referral code {currentUser.ownReferralCode}</EuiText>
   {successCount*50} you earned!
   </>
  );
};

export default RewardsBonus;
