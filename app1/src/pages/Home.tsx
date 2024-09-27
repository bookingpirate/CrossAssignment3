import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/react';
import axios from 'axios';
import './Home.css';

const Home: React.FC = () => {
    const [astronauts, setAstronauts] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAstronauts = async () => {
            try {
                const response = await axios.get('http://api.open-notify.org/astros.json');
                const astronautNames = response.data.people.map((person: { name: string }) => person.name);
                setAstronauts(astronautNames);
            } catch (error) {
                console.error("Error fetching astronauts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAstronauts();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="home-page">
                <h1>Astronauts Currently in Space</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <IonList>
                        {astronauts.length > 0 ? (
                            astronauts.map((name, index) => (
                                <IonItem key={index}>
                                    <IonLabel>{name}</IonLabel>
                                </IonItem>
                            ))
                        ) : (
                            <IonItem>
                                <IonLabel>No astronauts currently in space.</IonLabel>
                            </IonItem>
                        )}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Home;
