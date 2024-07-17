import React, {useEffect, useState} from 'react';
import { IonContent, IonPage } from '@ionic/react'
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {checkToken, registerUser} from "../util/service/loginService";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')

    const history = useHistory();
    const location = useLocation();
    const token = useParams<{token: string}>();

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleRegister();
        }
    };

    const handleRegister = async () => {
        try {
            const registered = await registerUser(token.token, password, passwordConfirm);
            if (registered) {
                history.push('/login', {direction: 'none'});
            } else {
                alert('Fehler bei der Registrierung');
            }
        }catch (e) {
            console.log(e);
            alert('Fehler bei der Registrierung');
        }
    };


    useEffect(() => {
        if (checkToken()) {
            // history.push('/login', {direction: 'none'});
            window.location.assign('/tabs/tab1');
        }
    }, [location]);

    useEffect(() => {
        function checkURLForLogin() {
            const currentURL = window.location.href;
            const motivationCounterElement = document.querySelector('.motivationCounter');

            if (currentURL.includes('register')) {
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

        checkURLForLogin();
    }, [location]);

    return (
        <IonPage>
            <IonContent className={"loginContent"}>
                <div className={"login"}>
                    <h1>Registrierung</h1>
                    <div className={"loginFlex"}>
                        <label>Passwort</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value!)}
                            onKeyPress={handleEnterPress}
                        />
                    </div>
                    <div className={"loginFlex"}>
                        <label>Passwort bestätigen</label>
                        <input
                            type="password"
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value!)}
                            onKeyPress={handleEnterPress}
                        />
                    </div>
                    <button className={"secondary"} onClick={handleRegister}>Registriere dich</button>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;
