import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar: React.FC<{ value: number, maxValue:number, type:string, group?:string }> = ({ value, maxValue, type, group }) => {

    const renderValue = () => {
        if (type === "OverviewPlace" || type === "CourtPlace" || type === "AllCourtsPlace") {
            return maxValue - value;
        } else {
            return value;
        }

    }

    const renderMaxValue = () => {
        if (type === "OverviewPlace" || type === "CourtPlace" || type === "AllCourtsPlace") {
            return maxValue - 1;
        } else {
            return maxValue;
        }
    }

    const renderValueString = () => {
        const formatValue = (num: number) => num.toLocaleString('de-DE');
        if (type === "OverviewSteps") {
            return formatValue(value);
        } else if (type === "OverviewDistance") {
            return formatValue(value) + " km";
        } else if (type === "OverviewPlace") {
            return formatValue(value) + ".";
        } else if (type === "CourtPlace") {
            return formatValue(value) + ". Platz";
        } else if (type === "CourtSteps") {
            return formatValue(maxValue - value) + " Schritte"; // Schritte tgl.
        } else if (type === "AllCourtsPlace") {
            return formatValue(value) + ". Platz";
        } else if (type === "AllCourtsSteps") {
            return formatValue(maxValue - value) + " Schritte pro Nutzer"; // Schritte tgl.
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
            return `im ${group}`
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
                maxValue={renderMaxValue()}
                />
            <div>
                <div className="valuestring">
                    <p>{renderValueString()}</p>
                </div>
                <div className="label">
                    <p>{renderType()}</p>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
