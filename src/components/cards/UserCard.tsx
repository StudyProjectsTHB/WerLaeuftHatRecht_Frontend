import {
    IonButton,
    IonContent, IonIcon,
    IonPage,
    IonRouterOutlet, IonSelect, IonSelectOption,
} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';


import {useHistory} from "react-router";

import React, {useEffect, useState} from "react";
import Greeting from "../../components/Greeting";
import {ellipse, settingsOutline, star, starOutline, trashOutline} from "ionicons/icons";
import {checkToken, getToken, getUser} from "../../util/service/loginService";
import {changeUserGroup, getAllCourts} from "../../util/service/userService";


const UserCard: React.FC<{name:string, userId:number ,email:string, group:string, groupId:number, isAdmin:boolean ,courtNames:string[], courtIds:number[]}> = ({name, userId, email, group, groupId,isAdmin, courtNames, courtIds, onChangeClick, onAdminClick, onDeleteClick}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [userAdjective, setUserAdjective] = useState<string>("");
    const [userNoun, setUserNoun] = useState<string>("");
    const [userStepGoal, setUserStepGoal] = useState<number>(0);

    const history = useHistory();
    const location = useLocation();
    const [selectedValue, setSelectedValue] = useState<string>(group);

    useEffect(() => {
        if (!checkToken()) {
            // history.push('/login', {direction: 'none'});
            window.location.assign('/login');
        }

        const token = getToken();
        const user = getUser();
        if (token && user) {
            setUserAdjective(user.adjective);
            setUserNoun(user.noun);
            setUserStepGoal(user.stepGoal)
            setLoading(false);
        }
    }, [history]);

    const handleCourtChangeUser = async (newCourt:string) => {
        console.log(email, newCourt)
        const newCourtId = courtIds[courtNames.indexOf(newCourt)]
        try {
            const changed = await changeUserGroup(getToken(), userId, newCourtId)
            if (changed) {
                setSelectedValue(newCourt);
            } else {
                alert("Fehler beim Ändern des Gerichts des Nutzenden")
            }
        } catch (e) {
            console.log(e)
            alert("Fehler beim Ändern des Gerichts des Nutzenden")
        }
    }

    return (
        <div className="containerAdmin">
            <img
                src="images/UserIcon.png"
                alt="greeting-icon"
            />
            <div className={"name"}>
                <p>{name}</p>
                <p>{email}</p>
            </div>
            <select
                value={selectedValue}
                onChange={e => {
                    // setSelectedValue(e.target.value);
                    handleCourtChangeUser(e.target.value);
                }}
            >
                {courtNames.map((court) => {
                    return <option key={court} value={court}>{court}</option>
                })}

            </select>
            <div className={"buttonUser"}>
                <button onClick={onChangeClick}>
                    <IonIcon aria-hidden="true" icon={settingsOutline} />
                </button>
                <button onClick={onAdminClick} className={"adminChange"}>
                    {/*<IonIcon aria-hidden="true" icon={starOutline} />*/}
                    {isAdmin ? <IonIcon aria-hidden="true" icon={star} /> : <IonIcon aria-hidden="true" icon={starOutline} />}
                </button>
                <button onClick={onDeleteClick}>
                    <IonIcon aria-hidden="true" icon={trashOutline} />
                </button>
            </div>
        </div>
    )
};

export default UserCard;