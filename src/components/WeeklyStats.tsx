import React from 'react';
import ProgressBar from "./ProgressBar";

const WeeklyStats: React.FC<{ steps: number, distance: number, rank:number  }> = ({steps, distance, rank }) => {
    return (
        <div className="weekly-stats">
            <h2>Diese Woche</h2>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>

                <ProgressBar value={steps} maxValue={100000} type={"Schritte"}></ProgressBar>
                <ProgressBar value={distance} maxValue={50} type={"Strecke"}></ProgressBar>
                <ProgressBar value={rank} maxValue={10} type={"Platz"}></ProgressBar>
            </div>
        </div>
    );
};

export default WeeklyStats;
