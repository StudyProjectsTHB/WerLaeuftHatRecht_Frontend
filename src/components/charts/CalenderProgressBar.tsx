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


    const reachedMaxValue = value >= maxValue;

    const data = {
        labels: ['Gelaufen', 'Noch zu Laufen'],
        datasets: [
            {
                label: 'Schritte',
                data: [value, reachedMaxValue ? 0 : maxValue - value],
                backgroundColor: [
                    reachedMaxValue ? 'rgb(39,64,57)' : 'rgb(255,165,0)',
                    'rgb(217,217,217)',
                ],
                borderColor: [
                    reachedMaxValue ? 'rgb(39,64,57)' : 'rgb(255,165,0)',
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
                <span className={"value"}>{value}</span> <p className={"stepGoal"}>/ {maxValue}</p>
            </div>
            <IonButton onClick={onClick}>Jetzt eintragen</IonButton>
        </div>
    );
};

export default ThreeQuarterDoughnutChart;
