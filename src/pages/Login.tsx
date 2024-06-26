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
            <IonContent className={"loginContent"}>
                <div className={"login"}>
                <h1>Login</h1>
                    <div className={"loginFlex"}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value!)}
                        />
                    </div>
                    <div className={"loginFlex"}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value!)}
                        />
                    </div>
                <button className={"secondary"} onClick={handleLogin}>Anmelden</button>
                <a>Passwort vergessen</a>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
