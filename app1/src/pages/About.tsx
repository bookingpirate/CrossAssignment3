import packageJson from '../../package.json';
import profilBild from '../images/profilbild.png';
import './About.css';
import React, {useState, useEffect, useRef} from 'react';
import { useLogging } from '../logging/logging';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal } from '@ionic/react';

const About: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addLog, getLogs, clearLogs } = useLogging();
    const hasLogged = useRef(false);

    useEffect(() => {
        if (!hasLogged.current) {
            addLog('About page loaded');
            hasLogged.current = true;
        }
    }, [addLog]);

    const handleShowLogs = () => {
        addLog("Logs displayed");
        setIsModalOpen(true);
    };

    const handleClearLogs = () => {
        clearLogs();
        addLog("Logs cleared");
    };


    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="home-page">
                <div className="about-page">
                    <h1>About this App</h1>
                    <p>Version: {packageJson.version}</p>
                    <img src={profilBild} alt="Profile" className="profilbild"/>
                    <p>Developer: Niclas Böck</p>


                    <IonButton onClick={handleShowLogs}>Show Logs</IonButton>
                    <IonButton onClick={handleClearLogs} color="danger">Clear Logs</IonButton>

                    <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
                        <div>
                            <h2>Logs</h2>
                            {getLogs().map((log, index) => (
                                <p key={index}>{log}</p>
                            ))}
                            <IonButton onClick={() => setIsModalOpen(false)}>Close</IonButton>
                        </div>
                    </IonModal>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default About;
