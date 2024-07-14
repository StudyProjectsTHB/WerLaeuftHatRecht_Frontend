import React, {useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList, IonAlert } from '@ionic/react';
import {useHistory, useLocation} from 'react-router-dom';
import { checkToken, loginUser} from "../util/service/loginService";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const history = useHistory();
    const location = useLocation()

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
                {/*<a>Passwort vergessen</a>*/}
                </div>
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
