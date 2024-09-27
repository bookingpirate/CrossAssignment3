import "./Map.css";
import { IonContent, IonPage, IonButton, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useLogging } from '../logging/logging';
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import userMarker from '../images/user-marker.png';
import issMarker from '../images/iss-marker.png';

const ISS_API_URL = "http://api.open-notify.org/iss-now.json";

const Map: React.FC = () => {
    const { addLog } = useLogging();
    const hasLogged = useRef(false);
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
    const [issPosition, setIssPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (!hasLogged.current) {
            addLog("Map page loaded");
            hasLogged.current = true;
        }

        const fetchUserPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setUserPosition([latitude, longitude]);
                    addLog(`User position: [${latitude}, ${longitude}]`);
                    localStorage.setItem("userPosition", JSON.stringify([latitude, longitude]));
                }, (error) => {
                    console.error("Error obtaining position:", error);
                    addLog("Error obtaining user position.");
                });
            } else {
                addLog("Geolocation is not supported by this browser.");
            }
        };

        fetchUserPosition();

        // ISS-Position
        const fetchISSPosition = async () => {
            try {
                const response = await fetch(ISS_API_URL);
                const data = await response.json();
                const latitude = parseFloat(data.iss_position.latitude);
                const longitude = parseFloat(data.iss_position.longitude);
                setIssPosition([latitude, longitude]);
                addLog(`ISS position: [${latitude}, ${longitude}]`);
            } catch (error) {
                console.error("Error fetching ISS position:", error);
                addLog("Error fetching ISS position.");
            }
        };

        fetchISSPosition();
        const interval = setInterval(fetchISSPosition, 15000); //15 Sekunden

        return () => {
            clearInterval(interval);
        };
    }, [addLog]);

    const jumpToUserPosition = () => {
        if (userPosition) {
            window.location.href = `https://www.google.com/maps?q=${userPosition[0]},${userPosition[1]}`;
        }
    };

    // Custom Hook um die Kartenansicht zu setzen
    const SetViewOnClick = ({ position }: { position: [number, number] }) => {
        const map = useMap();
        useEffect(() => {
            setTimeout(() => {
                map.setView(position, map.getZoom());
            }, 100);
        }, [position, map]);

        return null;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Karte</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="map-container">
                    <MapContainer
                        center={userPosition ? userPosition : [51.505, -0.09]} // Standardwert
                        zoom={userPosition ? 13 : 2} // Zoomstufe
                        style={{ height: "750px", width: "100%" }} //
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {userPosition && (
                            <Marker
                                position={userPosition}
                                icon={L.icon({
                                    iconUrl: userMarker,
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41]
                                })}
                            >
                                <Popup>Benutzerposition</Popup>
                                <SetViewOnClick position={userPosition} />
                            </Marker>
                        )}
                        {issPosition && (
                            <Marker
                                position={issPosition}
                                icon={L.icon({
                                    iconUrl: issMarker,
                                    iconSize: [32, 32]
                                })}
                            >
                                <Popup>ISS Position</Popup>
                                <SetViewOnClick position={issPosition} />
                            </Marker>
                        )}
                    </MapContainer>
                </div>
                <IonButton expand="block" onClick={jumpToUserPosition}>
                    Zur Benutzerposition springen
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Map;
