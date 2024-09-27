import React from 'react';
import './SplashScreen.css'; // You can style it as you wish

const SplashScreen: React.FC = () => {
    return (
        <div className="splash-screen">
            <h1>Welcome to the Astronaut Tracker</h1>
            <p>Loading data...</p>
        </div>
    );
};

export default SplashScreen;
