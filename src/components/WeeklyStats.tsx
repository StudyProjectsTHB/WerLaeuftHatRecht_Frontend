import React from 'react';
import ProgressBar from "./charts/ProgressBar";

const WeeklyStats: React.FC<{ steps: number, distance: number, rank:number, maxSteps:number, maxDistance:number, maxRank:number }> = ({steps, distance, rank, maxSteps, maxDistance, maxRank }) => {
    return (
        <div className="weekly-stats">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <ProgressBar value={steps} maxValue={maxSteps} type={"OverviewSteps"}></ProgressBar>
                <ProgressBar value={distance} maxValue={maxDistance} type={"OverviewDistance"}></ProgressBar>
                <ProgressBar value={rank} maxValue={maxRank} type={"OverviewPlace"}></ProgressBar>
            </div>
        </div>
    );
};

export default WeeklyStats;
