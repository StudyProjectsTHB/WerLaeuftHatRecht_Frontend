import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC<{labels:string[], barData:number[]}> = ({labels, barData}) => {
    const data = {
        labels: labels,
        datasets: [
            {
                data: barData,
                backgroundColor: 'rgba(34, 56, 50, 1)',
                borderColor: 'rgba(34, 56, 50, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(100, 100, 100, 255)',
                hoverBorderColor: 'rgba(50,50,50,255)'
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        indexAxis: 'y',
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },

        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };

    return (
        <Bar data={data} options={options} />
    );
};

export default BarChart;
