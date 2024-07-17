import React, {useEffect, useState} from 'react';
import {IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel} from '@ionic/react';
import {Route, Redirect, useLocation} from 'react-router-dom';
import {IonReactRouter} from '@ionic/react-router';
import {
    createOutline,
    homeOutline, settingsOutline,
    statsChartOutline
} from 'ionicons/icons';

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Settings from "./pages/Settings";
import Tab4 from "./pages/Tab4";
import User from "./pages/Tab4/User";
import Courts from "./pages/Tab4/Courts";
import Competition from "./pages/Tab4/Competition";
import Statistics from "./pages/Tab4/Statistics";
import Export from "./pages/Tab4/Export";

import './theme/desktop.css';
import {checkToken, getToken, getUser} from "./util/service/loginService";
import {useHistory} from "react-router";
import {getDaysRemaining} from "./util/service/appService";
import UserSettings from "./pages/UserSettings";

const Tabs: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [motivationMessage, setMotivationMessage] = useState("Gib Vollgas. Du schaffst das!");
    const [daysRemaining, setDaysRemaining] = useState(0);


    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        function checkURLForLogin() {
            const currentURL = window.location.href;
            const motivationCounterElement = document.querySelector('.motivationCounter');

            if (currentURL.includes('login')) {
                if (motivationCounterElement) {
                    motivationCounterElement.classList.add('hidden');
                }
            } else {
                if (motivationCounterElement) {
                    let motivationMessage = "Gib Vollgas. Du schaffst das!";
                    if (daysRemaining === 0) {
                        motivationMessage = "Ziel erreicht! Gut gemacht!";
                    }
                    motivationCounterElement.classList.remove('hidden');
                    motivationCounterElement.innerHTML = `                    <h2>${daysRemaining} Tage verbleibend</h2>\n` +
                        `                    <p>${motivationMessage}</p>`

                }
            }
        }

        checkURLForLogin();
    }, [location, daysRemaining]);

    useEffect(() => {
        if (!checkToken()) {
            window.location.assign('/login');
        }

        const token = getToken();
        const user = getUser(token);
        if (token && user) {
            setIsAdmin(user.admin);
            setLoading(false);

            const updateDaysRemaining = () => {
                getDaysRemaining(token).then((days) => {
                    setDaysRemaining(days);
                });
            };

            updateDaysRemaining();

            const intervalId = setInterval(() => {
                updateDaysRemaining();
            }, 3600000);

            return () => clearInterval(intervalId);

        }

    }, [location]);

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/tabs/tab1">
                        <Tab1/>
                    </Route>
                    <Route exact path="/tabs/tab2">
                        <Tab2/>
                    </Route>
                    <Route path="/tabs/tab3">
                        <Tab3/>
                    </Route>
                    <Route exact path="/tabs">
                        <Redirect to="/tabs/tab1"/>
                    </Route>
                    <Route exact path="/tabs/tab4">
                        <Tab4/>
                    </Route>
                    <Route exact path="/tabs/settings">
                        <Settings/>
                    </Route>
                    <Route exact path={`/tabs/tab4/User`}>
                        <User/>
                    </Route>
                    <Route exact path={`/tabs/tab4/Courts`}>
                        <Courts/>
                    </Route>
                    <Route exact path={`/tabs/tab4/Competition`}>
                        <Competition/>
                    </Route>
                    <Route exact path={`/tabs/tab4/Statistics`}>
                        <Statistics/>
                    </Route>
                    <Route exact path={`/tabs/tab4/Export`}>
                        <Export/>
                    </Route>
                    <Route exact path={`/tabs/settings/userSettings`}>
                        <UserSettings/>
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/tabs/tab1">
                        <IonIcon aria-hidden="true" icon={homeOutline}/>
                        <IonLabel>Übersicht</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/tabs/tab2">
                        <IonIcon aria-hidden="true" icon={createOutline}/>
                        <IonLabel>Editieren</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tabs/tab3">
                        <IonIcon aria-hidden="true" icon={statsChartOutline}/>
                        <IonLabel>Statistik</IonLabel>
                    </IonTabButton>
                    {isAdmin &&
                    <IonTabButton tab="tab4" href="/tabs/tab4" className={"manager"}>
                        <IonIcon aria-hidden="true" icon={settingsOutline}/>
                        <IonLabel>Manager</IonLabel>
                    </IonTabButton>
                    }
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    )
};

export default Tabs;