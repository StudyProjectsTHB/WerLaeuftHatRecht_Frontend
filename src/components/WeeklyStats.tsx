import React from 'react';
import ProgressBar from "./charts/ProgressBar";

const WeeklyStats: React.FC<{ steps: number, distance: number, rank:number  }> = ({steps, distance, rank }) => {
    return (
        <div className="weekly-stats">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <ProgressBar value={steps} maxValue={100000} type={"OverviewSteps"}></ProgressBar>
                <ProgressBar value={distance} maxValue={50} type={"OverviewDistance"}></ProgressBar>
                <ProgressBar value={rank} maxValue={10} type={"OverviewPlace"}></ProgressBar>
            </div>
        </div>
    );
};

export default WeeklyStats;
