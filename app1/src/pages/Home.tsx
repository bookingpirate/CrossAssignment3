import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="home-page">
                <h1>Welcome to the Home Page</h1>

                <p>
                    This is the first page of our application. It provides an overview of the app's features and
                    functionalities.
                </p>
                    <h2>Key Features</h2>
                    <p>
                        Navigation between different tabs like Home, Map, Profile, and About
                    </p>
                    <p>
                        Map feature for location-based services
                    </p>
                    <p>
                        Profile page where you can manage your settings
                    </p>
                    <p>
                        About section with detailed information on the developer and app
                    </p>
                    <h2>How to Use the App</h2>
                    <p>
                        Use the navigation bar to switch between different sections of the app.
                    </p>
                    <p>
                        Use the 'Map' tab for location-based functionalities.
                    </p>
                    <p>
                        Explore the 'Profile' tab to view or modify your user details.
                    </p>
                    <p>
                        Check out the 'About' tab for more information about the app and the developer.
                    </p>
        </IonContent>
        </IonPage>
    );
};

export default Home;
