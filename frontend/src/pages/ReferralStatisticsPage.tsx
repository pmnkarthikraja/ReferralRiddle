import Chart, { registerables } from 'chart.js/auto';
import React, { FunctionComponent, useEffect, useRef } from "react";
import { UserDetail } from '../schema/dataStructure';
import { useUsersTracking } from '../hooks/useUsersTracking';
import { EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';

const ReferralStatisticsPage: FunctionComponent<{ currentUser: UserDetail }> = ({
    currentUser
}) => {
    const chartRef1 = useRef<HTMLCanvasElement>(null);
    const chartRef3 = useRef<HTMLCanvasElement>(null);
    const chartRef2 = useRef<HTMLCanvasElement>(null);
    const { referralTracks } = useUsersTracking(currentUser)


    const successCount: number = referralTracks.filter(r => r.status == 'Success').length
    const failedCount: number = referralTracks.filter(r => r.status == 'Failed').length
    const pendingCount: number = referralTracks.filter(r => r.status == 'Pending').length
    const totalCount: number = referralTracks.length

    const data = [successCount, pendingCount, failedCount, totalCount]
    const labels = ["Success", "Pending", "Failed", "TotalUsers"]

    useEffect(() => {
        let chartInstance: Chart | null = null;

        if (chartRef1.current) {
            const ctx = chartRef1.current.getContext('2d');
            if (ctx) {
                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Data',
                            data: data,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [data, labels]);

    useEffect(() => {
        let chartInstance: Chart<'pie', number[], string> | null = null;
        if (chartRef3.current) {
            const ctx = chartRef3.current.getContext('2d');
            if (ctx) {
                chartInstance = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Signed Out with Referral Code', 'Signed Out without Referral Code', 'Referral Code Sent', 'Total Users'],
                        datasets: [{
                            data: [successCount, failedCount, pendingCount, totalCount],
                            backgroundColor: [
                                'lightGreen',
                                'red',
                                'orange',
                                'lightblue',
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 0.1)',
                                'rgba(255, 99, 132, 0.1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }
                });
            }
        }
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [successCount, failedCount, pendingCount, totalCount]);


    const referralIncentives = [50]
    const userHasBeenReferred = currentUser.opReferralCode !== ''
    const earnings = userHasBeenReferred ? successCount * 50 + 50 : successCount * 50

    useEffect(() => {
        let chartInstance: Chart | null = null;
        if (chartRef2.current) {
            const ctx = chartRef2.current.getContext('2d');
            if (ctx) {
                chartInstance = new Chart(ctx, {
                    type: 'scatter',
                    data: {
                        datasets: [{
                            label: 'Referral Earnings',
                            data: referralIncentives.map((incentive) => ({ x: incentive, y: earnings })),
                            backgroundColor: 'lightgreen',
                            borderColor: 'orange',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Referral Incentive'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Earnings'
                                }
                            }
                        }
                    }
                });

            }
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [data, labels]);

    return (<React.Fragment>
        <EuiFlexGroup>
            <EuiFlexItem grow={true}>
                <div style={{ width: 'auto', height: '300px' }}>
                    <canvas ref={chartRef1}></canvas>
                </div>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <EuiFlexGroup>
            <EuiFlexItem> <div style={{ width: '400px', height: '300px' }}>
                <canvas ref={chartRef2}></canvas>
            </div></EuiFlexItem>
            <EuiFlexItem> <div style={{ width: '400px', height: '300px' }}>
                <canvas ref={chartRef3}></canvas>
            </div></EuiFlexItem>
        </EuiFlexGroup>
    </React.Fragment>
    );
}

export default ReferralStatisticsPage;


