// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: React.FC<{labels:string[], chartData:number[]}> = ({labels, chartData}) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Performance',
                data: chartData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#1c1c1e',
                tension: 0.3,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                display: true,
                grid: {
                    display: false
                },

                ticks: {

                    callback: function (value: any, index: number, values: string | any[]) {
                        if (index === 1) return chartData[1];
                        if (index === values.length - 2) return chartData[values.length - 2];
                        if (index === Math.floor(values.length / 2)) return chartData[Math.floor(values.length / 2)];
                        return '';
                    }
                }
            },
            y: {
                display: false,
                grid: {
                    display: false
                }

            //     beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div style={{ position: 'relative', height: '40vh', width: '80vw' }}>
            <Line data={data} options={options} />
            <div style={{ position: 'absolute', top: '0', left: '20px' }} className={"chartText"}>
                <h2>40%</h2>
                <p>Steigerung zu letzter Woche</p>
            </div>
        </div>
    );
};

export default LineChart;
