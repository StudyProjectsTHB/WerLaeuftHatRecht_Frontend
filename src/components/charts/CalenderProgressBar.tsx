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
                    'rgb(39,64,57)',
                    'rgb(217,217,217)',
                ],
                borderColor: [
                    'rgb(39,64,57)',
                    'rgb(217,217,217)',
                ],
                borderWidth: 1,
            },
        ],


    };

    const options = {
        rotation: -135, // Start position of the chart
        circumference: 270, // Sweep angle of the chart
        cutout: '90%',
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
            <Doughnut data={data} options={options}/>
            <div className="circular-progress-bar_value">
                {value} / {maxValue}
            </div>
            <IonButton onClick={onClick}>Jetzt eintragen</IonButton>
        </div>
    );
};

export default ThreeQuarterDoughnutChart;
