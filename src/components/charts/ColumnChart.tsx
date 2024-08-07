import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ColumnChart: React.FC<{labels:string[], columnData:number[], type:string, weeks:string[]}> = ({labels, columnData, type, weeks}) => {

    const backgroundColors = columnData.map((_, index) =>
        index === columnData.length - 1 ? 'rgba(34, 56, 50, 1)' : 'rgb(111,122,116)'
    );

    const borderColors = columnData.map((_, index) =>
        index === columnData.length - 1 ? 'rgb(34,56,50)' : 'rgb(111,122,116)'
    );


    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: backgroundColors,
                borderColor: borderColors,
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
            tooltip: {
                callbacks: {
                    title: function(tooltipItems) {
                        if (weeks)
                            return weeks[tooltipItems[0].dataIndex];
                        else
                            return tooltipItems[0].label;
                    },
                    label: function(tooltipItem) {
                        return type === 'courtStatistics' ? ` ${tooltipItem.raw.toLocaleString('de-DE')} Schritte pro Mitarbeiter` : ` ${tooltipItem.raw.toLocaleString('de-DE')} Schritte`;
                        // return ` ${tooltipItem.raw}`;
                    },
                }
            },
        },
        scales:{
            x: {
                grid: {
                    display: false
                },
            },
            y:{
                ticks:{
                    // stepSize: 1000,
                    callback: function(value:any){
                        return `${value / 1000} K`
                    },

                },
                grid: {
                    display: false
                },
            }
        }
    };

    return (
        <div className={"balkenSchritte"}>
            {/*<p className={"label"}>Schritte</p>*/}
            {<p className={"label"}>{type === 'courtStatistics' ? 'Schritte pro Mitarbeiter' : 'Schritte'}</p>}
            <Bar data={data} options={options} style={{marginTop: '30px', marginBottom: '10px'}}/>
        </div>
    );
};

export default ColumnChart;
