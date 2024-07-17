import {Redirect, Route, Switch} from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/main.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from "./pages/Login";
import Tabs from "./Tabs";
import Register from "./pages/Register";
import './theme/desktop.css';
import React, {useEffect} from "react";

setupIonicReact();

const App: React.FC = () => {
    useEffect(() => {
        document.title = "Wer Läuft Hat Recht!";
    }, []);

return (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Switch>
                    <Route path="/login" component={Login} exact={true}/>
                    <Route path="/register/:token" component={Register} exact={true}/>
                    <Route path="/tabs" component={Tabs}/>
                    <Route exact path="/" render={() => <Redirect to="/login"/>}/>
                    <Route path="*" render={() => <Redirect to="/login"/>}/>
                </Switch>
            </IonRouterOutlet>
            <div className={"motivationCounter"} style={{display: 'none'}}>
                <h2>0 Tage verbleibend</h2>
                <p>Gib Vollgas. Du schaffst das!</p>
            </div>
        </IonReactRouter>
    </IonApp>
);
}
;


export default App;
