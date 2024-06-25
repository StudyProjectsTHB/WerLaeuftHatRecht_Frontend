import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {IonButton} from "@ionic/react";

ChartJS.register(ArcElement, Tooltip, Legend);



const ThreeQuarterDoughnutChart: React.FC<{value:number, maxValue:number}> = ({value, maxValue, onClick}) => {
    const data = {
        labels: ['Gelaufen', 'Noch zu Laufen'],
        datasets: [
            {
                label: 'Schritte',
                data: [value, maxValue - value],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],


    };

    const options = {
        rotation: -135, // Start position of the chart
        circumference: 270, // Sweep angle of the chart
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
        },
    };

    return (
        <div className={`circular-progress-bar calendar`}>
            <Doughnut data={data} options={options} />
            <IonButton onClick={onClick}>Jetzt eintragen</IonButton>
        </div>
    );
};

export default ThreeQuarterDoughnutChart;
