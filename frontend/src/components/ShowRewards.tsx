import React from 'react';
import { EuiPage, EuiPageBody, EuiTitle, EuiText, EuiSpacer, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiEmptyPrompt, EuiPageSection, EuiCard, EuiImage } from '@elastic/eui';
import { UserDetail } from '../schema/dataStructure';

interface ShowRewardsProps {
    successfulReferrals: number;
    rewardAmount: number;
    hasUserReferredBySomeOne: boolean;
    whoReferred?:UserDetail|undefined
}


const ShowRewards: React.FC<ShowRewardsProps> = ({ successfulReferrals, rewardAmount, hasUserReferredBySomeOne,whoReferred }) => {
    if (hasUserReferredBySomeOne && whoReferred) {
        rewardAmount += 50;
    }

    const greetText =  (hasUserReferredBySomeOne || successfulReferrals ) ? 'Congratulations!' : 'Oops..' 


    return (
        <EuiPage restrictWidth>
            <EuiPageBody component="div">
                <EuiPageBody verticalPosition="center" horizontalPosition="center">
                    <EuiPageSection>
                        <EuiTitle size="l">
                            <h1>{greetText}</h1>
                        </EuiTitle>
                        <EuiSpacer />
                        <EuiText>
                            {(hasUserReferredBySomeOne && !!whoReferred) ? (
                                <p>You have been credited <b>50 INR</b> for being referred by <b>{whoReferred.userName}</b> !</p>
                            ) : (
                                <p>You have not been referred by anyone.</p>
                            )}
                            {successfulReferrals > 0 && (
                                <p>You have successfully referred {successfulReferrals} users who signed up using your referral code.</p>
                            )}
                            <p>You have been rewarded <b>{rewardAmount} INR </b> for your efforts !!</p>
                        </EuiText>
                        <EuiSpacer size="xl" />
                        <EuiFlexGroup gutterSize="l" justifyContent="center">
                           <EuiImage width={100} height={100} alt='loadingImg' src='prize.png'   />
                        </EuiFlexGroup>
                    </EuiPageSection>
                </EuiPageBody>
            </EuiPageBody>
        </EuiPage>
    );
};

export default ShowRewards;
