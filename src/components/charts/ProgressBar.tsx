import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar: React.FC<{ value: number, maxValue:number, type:string }> = ({ value, maxValue, type }) => {

    const renderValue = () => {
        if (type === "OverviewPlace") {
            return maxValue - value;
        } else if (type === "CourtPlace") {
            return maxValue - value;
        } else if (type === "AllCourtsPlace") {
            return maxValue - value;
        } else {
            return value;
        }
    }

    const renderValueString = () => {
        if (type === "OverviewSteps") {
            return value;
        } else if (type === "OverviewDistance") {
            return value + " km";
        } else if (type === "OverviewPlace") {
            return value + ".";
        } else if (type === "CourtPlace") {
            return value + ". Platz";
        } else if (type === "CourtSteps") {
            return (maxValue -value) + " Schritte (tgl.)";
        } else if (type === "AllCourtsPlace") {
            return value + ". Platz";
        } else if (type === "AllCourtsSteps") {
            return value + " Schritte (tgl.)";
        }
    }

    const renderType = () => {
        if (type === "OverviewSteps") {
            return "Schritte";
        } else if (type === "OverviewDistance") {
            return "Strecke";
        } else if (type === "OverviewPlace") {
            return "Platz";
        } else if (type === "CourtPlace") {
            return "im OLG XYZ"
        } else if (type === "CourtSteps") {
            return "um aufzusteigen";
        } else if (type === "AllCourtsPlace") {
            return "im Gerichte-Wettbewerb";
        } else if (type === "AllCourtsSteps") {
            return "um aufzusteigen";
        }
    }

    return (
        <div className={`circular-progress-bar ${type}`}>
            <CircularProgressbar
                value= {renderValue()}
                maxValue={maxValue}
                />
                <div className="valuestring">
                    <p>{renderValueString()}</p>
                </div>
                <div className="label">
                    <p>{renderType()}</p>
                </div>
        </div>
    );
};

export default ProgressBar;
