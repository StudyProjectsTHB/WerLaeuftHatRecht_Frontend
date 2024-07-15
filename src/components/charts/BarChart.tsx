import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC<{labels:string[], barData:number[], ownName:string}> = ({labels, barData, ownName}) => {

    const backgroundColors = labels.map((label) =>
        label === ownName ? 'rgb(34,56,50)' : 'rgb(111,122,116)'
    );

    const borderColors = labels.map((label) =>
        label === ownName ? 'rgb(34,56,50)' : 'rgb(111,122,116)'
    );

    const data = {
        labels: labels,
        datasets: [
            {
                data: barData,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
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
                ticks:{
                    // stepSize: 1000,
                    callback: function(value:any){
                        return `${value / 1000} K`
                    },
                },
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
