import React, {useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList } from '@ionic/react'
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();

    const handleRegister = () => {
        console.log('Password:', password);
        // Füge hier deine Registrierungs-Logik hinzu
        history.push('/login');

    };

    useEffect(() => {
        // Funktion, die überprüft, ob "login" in der URL enthalten ist
        function checkURLForLogin() {
            // Die aktuelle URL abrufen
            const currentURL = window.location.href;
            console.log('Aktuelle URL:', currentURL);
            const motivationCounterElement = document.querySelector('.motivationCounter');

            // Überprüfen, ob "login" in der URL enthalten ist
            if (currentURL.includes('register')) {
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
                    <h1>Registrierung</h1>
                    <div className={"loginFlex"}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value!)}
                        />
                    </div>
                    <button className={"secondary"} onClick={handleRegister}>Registriere dich</button>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;
