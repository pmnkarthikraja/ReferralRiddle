import React from 'react';
import { EuiPage, EuiPageBody, EuiTitle, EuiText, EuiSpacer, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiEmptyPrompt, EuiPageSection, EuiCard } from '@elastic/eui';

interface RewardCollectionProps {
    successfulReferrals: number;
    rewardAmount: number;
}

const RewardCollectionPage: React.FC<RewardCollectionProps> = ({ successfulReferrals, rewardAmount }) => {
    if (successfulReferrals === 0) {
        return (
            <EuiPage restrictWidth>
                <EuiPageBody component="div">
                    <EuiPageBody verticalPosition="center" horizontalPosition="center">
                        <EuiPageSection>
                            <EuiEmptyPrompt
                                iconType="faceSad"
                                title={<h2>Oops! No Rewards Yet</h2>}
                                body={<p>It seems you haven't referred anyone successfully yet. Keep inviting friends to earn rewards!</p>}
                            />
                        </EuiPageSection>
                    </EuiPageBody>
                </EuiPageBody>
            </EuiPage>
        );
    }

    return (
        <EuiPage restrictWidth>
            <EuiPageBody component="div">
                <EuiPageBody verticalPosition="center" horizontalPosition="center">
                    <EuiPageSection>
                        <EuiTitle size="l">
                            <h1>Congratulations!</h1>
                        </EuiTitle>
                        <EuiText>
                            <p>You have successfully referred {successfulReferrals} users who signed up using your referral code.</p>
                            <p>You have been rewarded ${rewardAmount} for your efforts.</p>
                        </EuiText>
                        <EuiSpacer size="xl" />
                        <EuiFlexGroup gutterSize="l" justifyContent="center">
                            <EuiFlexItem grow={false}>
                                <EuiCard
                                    title="Redeem Rewards"
                                    description="Redeem your rewards for exciting offers!"
                                    icon={<EuiIcon type="creditCard" size="xxl" />}
                                    href="/redeem"
                                />
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiCard
                                    title="Invite More Friends"
                                    description="Keep earning rewards by inviting more friends!"
                                    icon={<EuiIcon type="invite" size="xxl" />}
                                    href="/invite"
                                />
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiPageSection>
                </EuiPageBody>
            </EuiPageBody>
        </EuiPage>
    );
};

export default RewardCollectionPage;
