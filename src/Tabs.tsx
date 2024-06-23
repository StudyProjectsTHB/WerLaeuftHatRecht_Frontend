import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import {createOutline, ellipse, homeOutline, square, statsChartOutline, triangle} from 'ionicons/icons';

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

const Tabs: React.FC = () => (
    <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tabs/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tabs/tab2">
              <Tab2 />
            </Route>
            <Route path="/tabs/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/tabs">
              <Redirect to="/tabs/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tabs/tab1">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>Übersicht</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tabs/tab2">
              <IonIcon aria-hidden="true" icon={createOutline} />
              <IonLabel>Editieren</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tabs/tab3">
              <IonIcon aria-hidden="true" icon={statsChartOutline} />
              <IonLabel>Statistiken</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
    </IonReactRouter>
);

export default Tabs;