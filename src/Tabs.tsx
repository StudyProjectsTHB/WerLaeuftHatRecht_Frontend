import React, {useEffect, useState} from 'react';
import {IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel} from '@ionic/react';
import {Route, Redirect, useLocation} from 'react-router-dom';
import {IonReactRouter} from '@ionic/react-router';
import {
    createOutline,
    ellipse,
    homeOutline, location,
    settingsOutline,
    square,
    statsChartOutline,
    triangle
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
import Login from "./pages/Login";

import './theme/desktop.css';
import {checkToken, getToken, getUser} from "./util/service/loginService";
import {useHistory} from "react-router";

const Tabs: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

    const history = useHistory();
    const location = useLocation()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsDesktop(false)
            } else {
                setIsDesktop(true)
            }
        }
        if (!checkToken()) {
            window.location.assign('/login');
        }


        const token = getToken();
        const user = getUser(token);
        if (token && user) {
            setIsAdmin(user.admin);
            setLoading(false);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [location, history]);

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
                        <IonLabel>Statistiken</IonLabel>
                    </IonTabButton>
                  {isAdmin && isDesktop && (
                      <IonTabButton tab="tab4" href="/tabs/tab4">
                        <IonIcon aria-hidden="true" icon={settingsOutline}/>
                        <IonLabel>Manager</IonLabel>
                      </IonTabButton>
                  )}
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    )
};

export default Tabs;