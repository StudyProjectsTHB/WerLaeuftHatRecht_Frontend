import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {IonButton} from "@ionic/react";

const ProgressBar: React.FC<{ value: number, maxValue:number}> = ({ value, maxValue, onClick}) => {
    return (
        <div className={`circular-progress-bar calendar`}>
            <CircularProgressbar
                value= {value}
                maxValue={maxValue}
                text={<>
                    <tspan dy="-0.5em">{value}</tspan>
                    <tspan x="50%" dy="1.2em">/{maxValue}</tspan>
                </>}
            />
            <IonButton onClick={onClick}>Jetzt eintragen</IonButton>
        </div>
    );
};

export default ProgressBar;
