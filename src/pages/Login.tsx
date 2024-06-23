import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();

    const handleLogin = () => {
        console.log('Email:', email);
        console.log('Password:', password);
        // Füge hier deine Login-Logik hinzu
        history.push('/tabs/tab1');
    };

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput
                            type="email"
                            value={email}
                            onIonChange={e => setEmail(e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                            type="password"
                            value={password}
                            onIonChange={e => setPassword(e.detail.value!)}
                        />
                    </IonItem>
                </IonList>
                <IonButton expand="full" onClick={handleLogin}>Anmelden</IonButton>
                <IonButton expand="full" >Passwort vergessen</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;
