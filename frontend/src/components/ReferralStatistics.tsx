import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import Chart, { registerables } from 'chart.js/auto';
import { useEffect, useRef } from "react";

const ReferralStatistics: React.FC = () => {
const chartRef = useRef<HTMLCanvasElement>(null);
const data=[1,2,3,4,54]
const labels=["one","two","three","four","five"]
  useEffect(() => {
      if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
              new Chart(ctx, {
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
  }, [data, labels]);

  const dateLabels = ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05'];
const signupsData = [10, 15, 20, 18, 25];


const referralIncentives = [10, 20, 30, 40, 50];
const earnings = [500, 800, 1200, 1500, 2000]; // Assuming earnings in dollars


  return (
      <div >
        <canvas ref={chartRef}></canvas>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFlexGroup>
              <EuiFlexItem>
              <PieChart data={data} labels={labels} />
              </EuiFlexItem>
              <EuiFlexItem>
              <ReferralPieChart failedCount={2} pendingCount={3} successCount={5} totalCount={8} />
              </EuiFlexItem>
              <EuiFlexItem>
              <ReferralSignupsLineChart dateLabels={dateLabels} signupsData={signupsData} />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
          <ReferralEarningsScatterPlot  earnings={earnings} referralIncentives={referralIncentives} />
     
          <ReferralSignupsDoughnutChart failedCount={40} successfulCount={60}/>
                </div>
  );
}

export default ReferralStatistics;




interface ChartProps {
    data: number[];
    labels: string[];
}

const PieChart: React.FC<ChartProps> = ({ data, labels }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            Chart.register(...registerables); // Register necessary scales
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }
                });
            }
        }
    }, [data, labels]);

    return (
        <div style={{width:"300px",height:'400px'}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}



interface PieChartProps {
    successCount: number;
    failedCount: number;
    pendingCount: number;
    totalCount: number;
}

const ReferralPieChart: React.FC<PieChartProps> = ({ successCount, failedCount, pendingCount, totalCount }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            Chart.register(...registerables); // Register necessary scales
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Signed Out with Referral Code', 'Signed Out without Referral Code', 'Referral Code Sent', 'Total Users'],
                        datasets: [{
                            data: [successCount, failedCount, pendingCount, totalCount],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }
                });
            }
        }
    }, [successCount, failedCount, pendingCount, totalCount]);

    return (
      <div style={{width:"300px",height:'400px'}}>
      <canvas ref={chartRef}></canvas>
        </div>
    );
}

interface LineChartProps {
    dateLabels: string[];
    signupsData: number[];
}

const ReferralSignupsLineChart: React.FC<LineChartProps> = ({ dateLabels, signupsData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            Chart.register(...registerables);
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dateLabels,
                        datasets: [{
                            label: 'Referral Sign-ups',
                            data: signupsData,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    }
                });
            }
        }
    }, [dateLabels, signupsData]);

    return (
      <div style={{width:"300px",height:'400px'}}>
      <canvas ref={chartRef}></canvas>
        </div>
    );
}


interface ScatterPlotProps {
    referralIncentives: number[];
    earnings: number[];
}

const ReferralEarningsScatterPlot: React.FC<ScatterPlotProps> = ({ referralIncentives, earnings }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            Chart.register(...registerables);
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'scatter',
                    data: {
                        datasets: [{
                            label: 'Referral Earnings',
                            data: referralIncentives.map((incentive, index) => ({ x: incentive, y: earnings[index] })),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
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
    }, [referralIncentives, earnings]);

    return (
      <div style={{width:"300px",height:'400px'}}>
      <canvas ref={chartRef}></canvas>
        </div>
    );
}

interface DoughnutChartProps {
    successfulCount: number;
    failedCount: number;
}

const ReferralSignupsDoughnutChart: React.FC<DoughnutChartProps> = ({ successfulCount, failedCount }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            Chart.register(...registerables);
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Successful Sign-ups', 'Failed Sign-ups'],
                        datasets: [{
                            data: [successfulCount, failedCount],
                            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Proportion of Successful vs. Failed Referral Sign-ups'
                            }
                        }
                    }
                });
            }
        }
    }, [successfulCount, failedCount]);

    return (
      <div style={{width:"300px",height:'400px'}}>
      <canvas ref={chartRef}></canvas>
        </div>
    );
}

