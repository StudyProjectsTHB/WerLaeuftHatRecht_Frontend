import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC<{ labels: string[], barData: number[], ownName: string, type: string }> = ({
                                                                                                        labels,
                                                                                                        barData,
                                                                                                        ownName,
                                                                                                        type
                                                                                                    }) => {

    const backgroundColors = labels.map((label) =>
        label === ownName ? 'rgba(34, 56, 50, 1)' : 'rgb(111,122,116)'
    );

    const borderColors = labels.map((label) =>
        label === ownName ? 'rgba(34, 56, 50, 1)' : 'rgb(111,122,116)'
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
                ticks: {
                    // stepSize: 1000,
                    callback: function (value: any) {
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
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        return `${tooltipItems[0].label}`;
                    },
                    label: function (tooltipItem) {
                        return type === 'courtStatistics' ? ` ${tooltipItem.raw.toLocaleString('de-DE')} Schritte pro Mitarbeiter` : ` ${tooltipItem.raw.toLocaleString('de-DE')} Schritte`;
                    },
                }
            },
        },
    };

    return (
        <Bar data={data} options={options}/>
    );
};

export default BarChart;
