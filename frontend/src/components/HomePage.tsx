import { EuiAvatar, EuiButton, EuiButtonEmpty, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiHeaderLink, EuiHeaderLinks, EuiHeaderLogo, EuiHeaderSection, EuiHeaderSectionItem, EuiIcon, EuiImage, EuiInMemoryTable, EuiLoadingLogo, EuiPage, EuiPageBody, EuiPageSection, EuiPageSidebar, EuiPanel, EuiProgress, EuiSkeletonCircle, EuiSkeletonLoading, EuiSkeletonRectangle, EuiSkeletonText, EuiSkeletonTitle, EuiSpacer, EuiText, EuiTextColor, EuiTitle } from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import ReferralStatistics from "./ReferralStatistics";
import ShareReferral from "./ShareReferral";
import { UserDetail } from "./dataStructure";
import { userApi } from "./userApi";
import ReferralTracking from "./ReferralTracking";
import RewardsBonus from "./RewardsBonus";
import LoadingScreen from "./LoadingScreen";
import axios, { AxiosError } from "axios";

const cardStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
};

const HomePage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [visualization, setVisualization] = useState<boolean>(false)
    const [referralTracking, setReferralTracking] = useState<boolean>(false)
    const [bonusPage, setBonusPage] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [apiError,setApiError] = useState<AxiosError>()
    const [user, setUser] = useState<UserDetail>({
        email: '',
        password: '',
        phone: '',
        userName: '',
        ownReferralCode: '',
        opReferralCode: ''
    })

    useEffect(() => {
        const verifyCookie = async () => {
            try{
                setApiError(undefined)
                setIsLoading(true)
            const { data } = await userApi.authUser()
            const { status, user } = data;
            setIsLoading(false)
            if (!!user) {
                setUser(user)
            }
            if (!status) {
                removeCookie('token')
                navigate("/login")
            } 
            }catch(e){
                if (axios.isAxiosError(e)){
                    setApiError(e)
                    removeCookie('token')
                    navigate("/login")
                }
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const doLogout = () => {
        removeCookie("token");
        navigate("/login");
    };

    if (isLoading) {
        return <><LoadingScreen/>
        {/* {apiError && <ToastErros errors={[apiError]}/>} */}

        </>
    }
    return (
        <React.Fragment>
            <EuiPage paddingSize='l' direction='row' >
            {/* {apiError && <ToastErros errors={[apiError]}/>} */}

                <EuiPageSidebar
                    paddingSize="l" hasEmbellish>
                    <EuiTitle><p>User Dashboard</p></EuiTitle>

                    <EuiButtonEmpty onClick={() => {
                        setVisualization(false);
                        setReferralTracking(false)
                        setBonusPage(false)
                    }}>Home</EuiButtonEmpty>
                    <EuiSpacer />

                    <ShareReferral user={user} />

                    <EuiButtonEmpty onClick={() => {
                        setReferralTracking(true);
                        setVisualization(false)
                        setBonusPage(false)
                    }}>Referral Tracking</EuiButtonEmpty>
                    <EuiSpacer />

                    <EuiButtonEmpty onClick={() => {
                        setVisualization(true);
                        setReferralTracking(false)
                        setBonusPage(false)
                    }}>Referral Statistics</EuiButtonEmpty>
                    <EuiSpacer />

                    <EuiButtonEmpty onClick={() => {
                        setVisualization(false);
                        setReferralTracking(false)
                        setBonusPage(true)
                    }}>Reward & Bonus</EuiButtonEmpty>
                    <EuiSpacer />
                </EuiPageSidebar>

                <EuiPageBody panelled={true} paddingSize={'l'}>
                    <EuiHeader>
                        <EuiHeaderSection grow={false}>
                            <EuiHeaderSectionItem>
                                <EuiHeaderLogo iconType="logoElastic">Referral App</EuiHeaderLogo>
                            </EuiHeaderSectionItem>
                        </EuiHeaderSection>
                        <EuiHeaderSection side="right">
                            <EuiHeaderSectionItem>
                                <EuiButton size='s' color='primary' fill onClick={doLogout}>Logout</EuiButton>
                            </EuiHeaderSectionItem>
                        </EuiHeaderSection>
                    </EuiHeader>
                    <EuiPageSection bottomBorder={true} paddingSize='l' restrictWidth={true}>
                        {referralTracking && <ReferralTracking user={user} />}

                        {visualization && <ReferralStatistics />}

                        {bonusPage && <RewardsBonus currentUser={user} />}

                        {!visualization && !referralTracking && !bonusPage && <div style={{ height: window.innerHeight }}>

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
                                                <EuiButton fill color="primary" onClick={()=>{}}>Refer Now</EuiButton>
                                            </div>
                                        </EuiFlexItem>
                                        <EuiFlexItem>
                                            <div className="euiCanAnimate" style={cardStyle}>
                                                <EuiText>
                                                    <h3>Track Referrals</h3>
                                                    <p>Monitor your referral activity and earnings.</p>
                                                </EuiText>
                                                <EuiSpacer size="s" />
                                                <EuiButton fill color="primary">Track Now</EuiButton>
                                            </div>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                </div>
                            </EuiPageBody>
                        </div>}
                    </EuiPageSection>
                </EuiPageBody>
            </EuiPage>
        </React.Fragment>
    );
};

export default HomePage;