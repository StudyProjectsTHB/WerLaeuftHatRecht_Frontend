import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ColumnChart: React.FC<{labels:string[], columnData:number[]}> = ({labels, columnData}) => {
    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(34, 56, 50, 1)',
                borderColor: 'rgba(34, 56, 50, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(100, 100, 100, 255)',
                hoverBorderColor: 'rgba(50,50,50,255)',
                data: columnData,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
            },
            y: {
                grid: {
                    display: false
                },
            }
        }
    };

    return (
        <Bar data={data} options={options} style={{marginTop: '30px', marginBottom: '10px'}}/>
    );
};

export default ColumnChart;
