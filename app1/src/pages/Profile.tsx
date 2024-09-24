import "./Profile.css"
import { useLogging } from '../logging/logging';
import {useEffect, useRef} from "react";

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
        <div className="profile-page">
            <h1>Profile</h1>
            <p>Assignment 1</p>
        </div>
    );
};

export default About;