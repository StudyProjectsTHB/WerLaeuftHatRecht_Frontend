import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar: React.FC<{ value: number, maxValue:number, type:string }> = ({ value, maxValue, type }) => {
    return (
        <div className={`circular-progress-bar ${type}`}>
            <CircularProgressbar
                value={type === "Platz" ? 10 - value : value}
                maxValue={maxValue}
                />
                <div className="valuestring">
                    {type==="Schritte" ? <p>{`${value} km`}</p> : (type==="Platz" ? <p>{`${value}.`}</p> : <p>{value}</p>)}
                </div>
                <div className="label">
                    <p>{type}</p>
                </div>
        </div>
    );
};

export default ProgressBar;
