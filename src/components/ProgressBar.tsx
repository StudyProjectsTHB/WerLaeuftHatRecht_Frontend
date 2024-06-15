import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar: React.FC<{ value: number, maxValue:number, type:string }> = ({ value, maxValue, type }) => {
    return (
        <div className="circular-progress-bar">
            <CircularProgressbar
                value={type === "Platz" ? 10 - value : value}

                maxValue={maxValue}
                />
                <div className="icon">
                <img src={`${type}.png`} alt="pgb icon" />
                </div>
                <div className="valuestring">
                    {type==="Schritte" ? <span>{`${value} km`}</span> : (type==="Platz" ? <span>{`${value}.`}</span> : <span>{value}</span>)}
                </div>
                <div className="label">
                    <span>{type}</span>
                </div>
        </div>
    );
};

export default ProgressBar;
