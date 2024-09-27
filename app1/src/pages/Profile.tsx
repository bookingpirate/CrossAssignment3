import "./Profile.css"
import { useLogging } from '../logging/logging';
import React, {useEffect, useRef} from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const About: React.FC = () => {
    const { addLog } = useLogging();
    const hasLogged = useRef(false);

    useEffect(() => {
        if (!hasLogged.current) {
            addLog('Profile page loaded');
            hasLogged.current = true;
        }
    }, [addLog]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="home-page">
                <div className="profile-page">
                    <h1>Profile</h1>
                    <p>Assignment 1</p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default About;