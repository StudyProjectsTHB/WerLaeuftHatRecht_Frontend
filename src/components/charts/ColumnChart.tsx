import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ColumnChart: React.FC<{labels:string[], columnData:number[], type:string}> = ({labels, columnData, type}) => {
    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(169, 169, 169, 255)',
                borderColor: 'rgba(100, 100, 100, 255)',
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
        scales:{
            y:{
                ticks:{
                    stepSize: 1000,
                    callback: function(value:any){
                        return `${value / 1000} K`
                    }
                }
            }
        }
    };

    return (
        <Bar data={data} options={options} />
    );
};

export default ColumnChart;
