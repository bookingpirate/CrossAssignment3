import "./Home.css"
import { useLogging } from '../logging/logging';
import {useEffect, useRef} from "react";

const About: React.FC = () => {
    const { addLog } = useLogging();
    const hasLogged = useRef(false);

    useEffect(() => {
        if (!hasLogged.current) {
            addLog('Home page loaded');
            hasLogged.current = true;
        }
    }, [addLog]);

    return (
        <div className="home-page">
            <h1>Homescreen</h1>
            <p>Assignment 1</p>
        </div>
    );
};

export default About;
