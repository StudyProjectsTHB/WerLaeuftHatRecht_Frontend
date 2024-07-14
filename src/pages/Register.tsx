import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList } from '@ionic/react'
import {useHistory, useLocation} from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();
    const location = useLocation();

    const handleRegister = () => {
        console.log('Password:', password);
        // Füge hier deine Registrierungs-Logik hinzu
        history.push('/login');

    };

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                            type="password"
                            value={password}
                            onIonChange={e => setPassword(e.detail.value!)}
                        />
                    </IonItem>
                </IonList>
                <IonButton expand="full" onClick={handleRegister}>Register</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Register;
