import React, { FunctionComponent, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { EuiFlexGroup, EuiFlexItem, EuiProgress } from '@elastic/eui';
import { useUsers } from './useUsers';
import { useUsersTracking } from './useUsersTracking';
import { UserDetail } from './dataStructure';

export interface ReferralStatisticsProps{
    currentUser:UserDetail
}

const ReferralStatistics: FunctionComponent<ReferralStatisticsProps> = ({
    currentUser
}) => {

    const {isLoading,userDetails} = useUsers()
  const [referralData, setReferralData] = useState<{ label: string; count: number }[]>([]);
  const referralTrackings = useUsersTracking(currentUser,userDetails)


  useEffect(() => {
    if (!isLoading ){
        const pendingCount =  referralTrackings.filter(re=>re.status=='Pending').length
        const failedCount = referralTrackings.filter(re=>re.status=='Failed').length
        const successCount =  referralTrackings.filter(re=>re.status=='Success').length
        const standardLables = [
            { label: 'Referral Code Sent but Not Yet Signup', count: pendingCount  },
            { label: 'Signup Without Referral Code', count: failedCount },
            { label: 'Successfully Signed Up Using Referral Code', count: successCount },
            { label: 'Referral Code Sent', count: pendingCount+failedCount+successCount }
          ];

      
          setReferralData(standardLables);
    }
   
  }, [isLoading,referralTrackings]);
 

  useEffect(() => {
    if (!isLoading){
        if (referralData.length > 0) {
            // Chart for Referral Code Sent but Not Yet Signup
            try{
                 new Chart('referralCodeSentChart', {
                    type: 'pie',
                    data: {
                      labels: referralData.map(entry => entry.label),
                      datasets: [{
                        data: referralData.map(entry => entry.count),
                        backgroundColor: ['orange', 'red', 'green', 'skyBlue']
                      }]
                    },
                    options: {
                      plugins: {
                        title: {
                          display: true,
                          text: 'Referral Code Status'
                        }
                      }
                    }
                  });
            }catch(e){
                console.log(e)
            }
           

          }
      
    
    }
  
  }, [referralData]);

  
  if (isLoading){
    return <><EuiProgress color='accent'/></>
}

  return (
    <div>
      <h2>Referral Statistics</h2>
      <EuiFlexGroup>
        <EuiFlexItem></EuiFlexItem>
        <EuiFlexItem> <div style={{width:300,height:400}}>
        <canvas  id="referralCodeSentChart"></canvas>
      </div></EuiFlexItem>
        <EuiFlexItem></EuiFlexItem>
     
      </EuiFlexGroup>
     
    </div>
  );
}

export default ReferralStatistics;
