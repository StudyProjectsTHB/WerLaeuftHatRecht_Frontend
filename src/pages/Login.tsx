import React, {useEffect, useState} from 'react';
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

    useEffect(() => {
        // Funktion, die überprüft, ob "login" in der URL enthalten ist
        function checkURLForLogin() {
            // Die aktuelle URL abrufen
            const currentURL = window.location.href;
            console.log('Aktuelle URL:', currentURL);
            const motivationCounterElement = document.querySelector('.motivationCounter');

            // Überprüfen, ob "login" in der URL enthalten ist
            if (currentURL.includes('login')) {
                // Die Klasse 'hidden' zur MotivationCounter hinzufügen
                if (motivationCounterElement) {
                    motivationCounterElement.classList.add('hidden');
                }
            }
            else {
                if (motivationCounterElement) {
                    motivationCounterElement.classList.remove('hidden');
                }
            }
        }

        // Die Funktion beim Laden der Komponente ausführen
        checkURLForLogin();
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
            </IonContent>
        </IonPage>
    );
};

export default Login;
