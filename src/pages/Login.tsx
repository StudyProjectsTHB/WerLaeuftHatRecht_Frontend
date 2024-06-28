import React, {useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from "axios";


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const history = useHistory();

    const handleLogin = async () => {
        console.log('Email:', email);
        console.log('Password:', password);

        try{
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.user);
                console.log('Login successful');
                localStorage.setItem('authToken', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log('user', JSON.parse(localStorage.getItem('user')));
                history.push('/tabs/tab1');
            } else {
                console.error('Login failed');
                setAlertMessage('Login fehlgeschlagen');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setShowAlert(true);
            setAlertMessage('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
        }

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
