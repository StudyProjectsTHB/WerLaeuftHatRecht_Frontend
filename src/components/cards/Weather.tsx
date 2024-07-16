import {
    IonIcon,


} from '@ionic/react';
import {useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React from "react";
import {
    cloudOutline,
    partlySunnyOutline,
    rainyOutline,
    snowOutline,
    sunnyOutline,
    thunderstormOutline
} from "ionicons/icons";

const Weather: React.FC<{temperature:number, condition:string, label:string}> = ({temperature, condition, label}) => {
    const history = useHistory();
    const location = useLocation();

    const weatherIcon = () => {
        switch (condition) {
            case 'sonnig':
                return sunnyOutline;
            case 'bewölkt':
                return partlySunnyOutline;
            case 'regen':
                return rainyOutline;
            case 'schnee':
                return snowOutline;
            case 'nieselregen':
                return rainyOutline;
            case 'gewitter':
                return thunderstormOutline;
            case 'nebelig':
                return cloudOutline;
            default:
                return cloudOutline;
        }
    }


    return (
        <div className={"circular-progress-bar"}>
            <IonIcon aria-hidden="true" icon={weatherIcon()}
                     style={{fontSize: '50px', color: '#000000'}}/>
            <div>
            <div className="valuestring">
                <p>{label} ({temperature} °C)</p>
            </div>
            <div className="label">
                <p>{condition.charAt(0).toUpperCase() + condition.slice(1)}</p>
            </div>
            </div>
        </div>
    );
};

export default Weather;
