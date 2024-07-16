import {useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React from "react";


const CourtStepsCard: React.FC<{name:string, steps:number}> = ({name, steps}) => {
    const history = useHistory();
    const location = useLocation();

    return (
        <div className="container">
            <img
                src="images/UserIcon.png"
                alt="greeting-icon"
            />
            <p>{name}</p>
            <p>{steps} Schritte</p>
        </div>
    )
};

export default CourtStepsCard;