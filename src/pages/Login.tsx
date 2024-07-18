import React, {useEffect, useState} from 'react';
import {IonContent, IonPage, IonAlert, IonToast} from '@ionic/react';
import {useHistory, useLocation} from 'react-router-dom';
import {checkToken, loginUser} from "../util/service/loginService";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [toastColor, setToastColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);


    const history = useHistory();
    const location = useLocation()

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (checkToken()) {
                history.push('/tabs/tab1');
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        function checkURLForLogin() {
            const currentURL = window.location.href;
            const motivationCounterElement = document.querySelector('.motivationCounter');

            if (currentURL.includes('login')) {
                if (motivationCounterElement) {
                    motivationCounterElement.classList.add('hidden');
                }
            } else {
                if (motivationCounterElement) {
                    motivationCounterElement.classList.remove('hidden');
                }
            }
        }

        checkURLForLogin();
    }, [location]);

    const handleLogin = async () => {
        try {
            await loginUser(email, password);
            history.push('/tabs/tab1');
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Login fehlgeschlagen');
            } else {
                setMessage(error.message);
            }
            setToastColor('#CD7070');
            setShowToast(true);
        }
    };

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
                            onKeyPress={handleEnterPress}
                        />
                    </div>
                    <div className={"loginFlex"}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value!)}
                            onKeyPress={handleEnterPress}
                        />
                    </div>
                    <button className={"secondary"} onClick={handleLogin}>Anmelden</button>
                    {/*<a>Passwort vergessen</a>*/}
                </div>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={message}
                    duration={3000}
                    cssClass="toast"
                    style={{
                        '--toast-background': toastColor
                    }}
                />

            </IonContent>
        </IonPage>
    );
};

export default Login;
