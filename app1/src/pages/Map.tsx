import "./Map.css"
import { useLogging } from '../logging/logging';
import {useEffect, useRef} from "react";

const About: React.FC = () => {
    const { addLog } = useLogging();
    const hasLogged = useRef(false);

    useEffect(() => {
        if (!hasLogged.current) {
            addLog('Map page loaded');
            hasLogged.current = true;
        }
    }, [addLog]);

    return (
        <div className="map-page">
            <h1>Map</h1>
            <p>Assignment 1</p>
        </div>
    );
};

export default About;