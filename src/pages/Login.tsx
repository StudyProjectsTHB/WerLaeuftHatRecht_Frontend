import React, {useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { checkToken, loginUser} from "../util/service/loginService";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const history = useHistory();

    const handleLogin = async () => {
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            await loginUser(email, password);
            history.push('/tabs/tab1');
        } catch (error) {
            console.error('Error logging in:', error);
            setAlertMessage(error.message);
            setShowAlert(true);
        }
    };

    useEffect(() => {
        // Funktion, die überprüft, ob "login" in der URL enthalten ist
        if (checkToken()) {
            history.push('/tabs/tab1');
        }
    }, []);

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
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Fehler'}
                    message={alertMessage}
                    buttons={['OK']}
                />

            </IonContent>
        </IonPage>
    );
};

export default Login;
