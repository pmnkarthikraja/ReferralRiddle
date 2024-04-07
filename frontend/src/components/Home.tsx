import { EuiButtonEmpty, EuiFlexGroup, EuiFlexItem, EuiInMemoryTable, EuiLoadingLogo, EuiPage, EuiPageBody, EuiPageSection, EuiPageSidebar, EuiPanel, EuiProgress, EuiSkeletonCircle, EuiSkeletonLoading, EuiSkeletonRectangle, EuiSkeletonText, EuiSkeletonTitle, EuiSpacer, EuiTitle } from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ReferralStatistics from "./ReferralStatistics";
import ShareReferral from "./ShareReferral";
import { UserDetail } from "./dataStructure";
import { userApi } from "./userApi";
import ReferralTracking from "./ReferralTracking";
import RewardsBonus from "./RewardsBonus";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [visualization, setVisualization] = useState<boolean>(false)
    const [referralTracking, setReferralTracking] = useState<boolean>(false)
    const [bonusPage,setBonusPage]=useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(false)
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
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };

    if (isLoading){
        return <> 
        <EuiSpacer size='xxl' />
         <EuiFlexGroup justifyContent='spaceEvenly'>
      <EuiFlexItem grow={false}>
      <EuiLoadingLogo  size='xl' logo="logoObservability" /> Loading...
      </EuiFlexItem>
    </EuiFlexGroup>
        </>
          
    }
    return (
        <React.Fragment>
            <EuiPage paddingSize='l' direction='row' >

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
           <EuiPageSection bottomBorder={true} paddingSize='l' restrictWidth={true}>
           {referralTracking && <ReferralTracking user={user} />}

               {visualization && <ReferralStatistics currentUser={user} />}

               {bonusPage && <RewardsBonus  currentUser={user}/>}

               {!visualization && !referralTracking && !bonusPage && <div style={{ height: window.innerHeight }}>
                   <h4>
                       Welcome <span>{user.email} |{user.phone}|{user.ownReferralCode}</span>
                   </h4>
                   <button onClick={Logout}>LOGOUT</button>
               </div>}
           </EuiPageSection>
       </EuiPageBody>





            </EuiPage>
        </React.Fragment>
    );
};

export default Home;