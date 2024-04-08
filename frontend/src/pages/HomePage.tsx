import { EuiAvatar, EuiButton, EuiButtonEmpty, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiHeaderLogo, EuiHeaderSection, EuiHeaderSectionItem, EuiIcon, EuiImage, EuiPage, EuiPageBody, EuiPageSection, EuiPageSidebar, EuiSpacer, EuiText, EuiTextColor, EuiTitle } from '@elastic/eui';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import ReferralStatisticsPage from './ReferralStatisticsPage';
import ReferralTrackingPage from './ReferralTrackingPage';
import RewardsBonusPage from './RewardsBonusPage';
import ShareReferralModal from '../components/ShareReferralModal';
import { UserDetail } from '../schema/dataStructure';
import { useAuth } from '../hooks/hooks';

const cardStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
};


interface PageInstance{
    referralTrackPage:boolean,
    rewardPage:boolean,
    referralStatisticsPage:boolean
}


const HomePage = () => {
    const [pageInstance,setPageInstance]=useState<PageInstance>({
        referralStatisticsPage:false,
        referralTrackPage:false,
        rewardPage:false
    })
    const navigate = useNavigate();
    const [cookies,, removeCookie] = useCookies(['token']);
    const {data, mutate: authMutation, isLoading, isError, error } = useAuth();

    useEffect(() => {
      const verifyCookie = async () => {
        try {
          await authMutation();
        } catch (e) {
          if (axios.isAxiosError(e)) {
            removeCookie("token");
            navigate("/login");
          }
        }
      };
      verifyCookie();
    }, [cookies, navigate, removeCookie]);


    useEffect(() => {
        if (isError && error) {
          removeCookie("token");
          navigate("/login");
        }
      }, [isError, error, navigate, removeCookie]);

    const doLogout = () => {
        removeCookie("token");
        navigate("/login");
    };

    const user:UserDetail = data?.data.user || {
        email:'',
        password:'',
        phone:'',
        userName:'',
    }

if (isLoading){
    return <LoadingScreen />
}

    return (
        <React.Fragment>
            <EuiPage paddingSize='l' direction='row' >
                <EuiPageSidebar paddingSize="l" hasEmbellish>
                    <EuiTitle><p>User Dashboard</p></EuiTitle>
                    <EuiButtonEmpty onClick={() => {
                        setPageInstance({
                            referralStatisticsPage:false,
                            referralTrackPage:false,
                            rewardPage:false,
                        })
                    }}>Home</EuiButtonEmpty>
                    <EuiSpacer />
                    <ShareReferralModal user={user} />
                    <EuiButtonEmpty onClick={() => {
                        setPageInstance({
                            referralStatisticsPage:false,
                            referralTrackPage:true,
                            rewardPage:false
                        })
                    }}>Referral Tracking</EuiButtonEmpty>
                    <EuiSpacer />
                    <EuiButtonEmpty onClick={() => {
                       setPageInstance({
                        referralStatisticsPage:true,
                        referralTrackPage:false,
                        rewardPage:false
                    })
                    }}>Referral Statistics</EuiButtonEmpty>
                    <EuiSpacer />
                    <EuiButtonEmpty onClick={() => {
                      setPageInstance({
                        referralStatisticsPage:false,
                        referralTrackPage:false,
                        rewardPage:true
                    })
                    }}>Reward & Bonus</EuiButtonEmpty>
                    <EuiSpacer />
                </EuiPageSidebar>
                
                <EuiPageBody panelled={true} paddingSize={'l'}>
                    <EuiHeader>
                        <EuiHeaderSection grow={false}>
                            <EuiHeaderSectionItem>
                                <EuiHeaderLogo iconType="logoElastic">Referral Riddle App</EuiHeaderLogo>
                            </EuiHeaderSectionItem>
                        </EuiHeaderSection>
                        <EuiHeaderSection side="right">
                            <EuiHeaderSectionItem>
                                <EuiButton size='s' color='primary' fill onClick={doLogout}>Logout</EuiButton>
                            </EuiHeaderSectionItem>
                        </EuiHeaderSection>
                    </EuiHeader>

                    <EuiPageSection bottomBorder={true} >
        {pageInstance.referralTrackPage && <ReferralTrackingPage user={user} />}

        {pageInstance.referralStatisticsPage && <ReferralStatisticsPage currentUser={user}/>}

        {pageInstance.rewardPage && <RewardsBonusPage currentUser={user} />}

        {!pageInstance.referralStatisticsPage && !pageInstance.referralTrackPage && !pageInstance.rewardPage && (
            <div style={{ height: window.innerHeight }}>
                <EuiPageBody>
                    <div style={{ padding: '20px' }}>
                        <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                            <EuiFlexItem>
                                <EuiFlexGroup alignItems="center" gutterSize="m">
                                    <EuiFlexItem grow={false}>
                                        <EuiAvatar name={user.userName} size="xl" />
                                    </EuiFlexItem>
                                    <EuiFlexItem>
                                        <EuiTitle size="l">
                                            <h1 style={{ marginBottom: '0' }}>Welcome, {user.userName}!</h1>
                                        </EuiTitle>
                                        <EuiText size="s">
                                            <EuiTextColor color="subdued">Email: {user.email}</EuiTextColor>
                                        </EuiText>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                                <EuiImage width={50} height={50} alt="loadingImage" src="https://pngimg.com/uploads/gift/gift_PNG5958.png" />
                            </EuiFlexItem>
                        </EuiFlexGroup>

                        <EuiSpacer size="l" />
                        <EuiFlexGroup direction="column" gutterSize="l">
                            <EuiFlexItem>
                                <div className="euiCanAnimate" style={cardStyle}>
                                    <EuiText>
                                        <h3>Refer a Friend</h3>
                                        <p>Invite your friends to join and earn rewards!</p>
                                    </EuiText>
                                    <EuiSpacer size="s" />
                                    <EuiIcon type={'heartbeatApp'} size='xxl'/>
                                </div>
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <div className="euiCanAnimate" style={cardStyle}>
                                    <EuiText>
                                        <h3>Track Referrals</h3>
                                        <p>Monitor your referral activity and earnings.</p>
                                    </EuiText>
                                    <EuiSpacer size="s" />
                                    <EuiButton fill color="primary" onClick={()=>{
                                        setPageInstance({
                                            referralStatisticsPage:false,
                                            referralTrackPage:true,
                                            rewardPage:false
                                        })
                                    }}>Track Now</EuiButton>
                                </div>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </div>
                </EuiPageBody>
            </div>
        )}
    </EuiPageSection>
                </EuiPageBody>
            </EuiPage>
        </React.Fragment>
    );
};

export default HomePage;
