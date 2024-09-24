import packageJson from '../../package.json';
import profilBild from '../images/profilbild.png';
import './About.css';


const About: React.FC = () => {
    return (
        <div className="about-page">
            <h1>About this App</h1>
            <p>Version: {packageJson.version}</p>
            <img src={profilBild} alt="Profile" className="profilbild"/>
            <p>Developer: Niclas Böck</p>
        </div>
    );
};

export default About;
