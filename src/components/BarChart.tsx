import React from 'react';
import { Bar } from 'react-chartjs-2';
import { IonCard, IonCardContent } from '@ionic/react';

const BarChart: React.FC<{chartData:any}> = ({ chartData }) => {
    const data = {
        labels: ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'],
        datasets: [
            {
                label: 'Schritte',
                data: chartData, // Use the passed prop data
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 12000,
                ticks: {
                    stepSize: 2000,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context:any) {
                        return context.raw + ' Schritte';
                    },
                },
            },
        },
    };

    return (
        <IonCard>
            <IonCardContent>
                <Bar data={data} options={options} />
            </IonCardContent>
        </IonCard>
    );
};

export default BarChart;
