import React, {useState, useEffect, useRef} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonToast } from '@ionic/react';
import {useLogging} from "../logging/logging";

interface Profile {
    id: number;
    name: string;
    address: string;
    email: string;
    profilePicture: string;
}

const ProfilePage: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [currentProfile, setCurrentProfile] = useState<Profile>({
        id: 0,
        name: '',
        address: '',
        email: '',
        profilePicture: ''
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const { addLog} = useLogging();
    const hasLogged = useRef(false);

    useEffect(() => {
        if (!hasLogged.current) {
            addLog('About page loaded');
            hasLogged.current = true;
        }
    }, [addLog]);


    useEffect(() => {
        const storedProfiles = localStorage.getItem('profiles');
        if (storedProfiles) {
            setProfiles(JSON.parse(storedProfiles));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }, [profiles]);


    const handleInputChange = (e: any, field: string) => {
        setCurrentProfile({ ...currentProfile, [field]: e.target.value });
    };

    const addProfile = () => {
        if (!currentProfile.name || !currentProfile.email) {
            setToastMessage('Name and Email are required.');
            setShowToast(true);
            return;
        }

        const newProfile = { ...currentProfile, id: Date.now() };
        setProfiles([...profiles, newProfile]);
        setCurrentProfile({ id: 0, name: '', address: '', email: '', profilePicture: '' });
        setToastMessage('Profile added successfully!');
        addLog('Added profile');
        setShowToast(true);
    };

    const editProfile = (profile: Profile) => {
        setCurrentProfile(profile);
    };

    const saveProfile = () => {
        if (!currentProfile.name || !currentProfile.email) {
            setToastMessage('Name and Email are required.');
            setShowToast(true);
            return;
        }

        const updatedProfiles = profiles.map((profile) =>
            profile.id === currentProfile.id ? currentProfile : profile
        );
        setProfiles(updatedProfiles);
        setCurrentProfile({ id: 0, name: '', address: '', email: '', profilePicture: '' });
        setToastMessage('Profile updated successfully!');
        setShowToast(true);
    };

    const deleteProfile = (id: number) => {
        const updatedProfiles = profiles.filter((profile) => profile.id !== id);
        setProfiles(updatedProfiles);
        setToastMessage('Profile deleted.');
        addLog('Profile deleted');
        setShowToast(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile Management</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>Manage Profiles</h2>

                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput value={currentProfile.name} onIonChange={(e) => handleInputChange(e, 'name')} placeholder="Enter Name" />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Address</IonLabel>
                        <IonInput value={currentProfile.address} onIonChange={(e) => handleInputChange(e, 'address')} placeholder="Enter Address" />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput value={currentProfile.email} onIonChange={(e) => handleInputChange(e, 'email')} placeholder="Enter Email" />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Profile Picture URL</IonLabel>
                        <IonInput value={currentProfile.profilePicture} onIonChange={(e) => handleInputChange(e, 'profilePicture')} placeholder="Enter Image URL" />
                    </IonItem>
                </IonList>

                {currentProfile.id === 0 ? (
                    <IonButton expand="block" onClick={addProfile}>
                        Add Profile
                    </IonButton>
                ) : (
                    <IonButton expand="block" onClick={saveProfile}>
                        Save Profile
                    </IonButton>
                )}

                <h3>Profiles List</h3>
                <IonList>
                    {profiles.map((profile) => (
                        <IonItem key={profile.id}>
                            <div>
                                <h4>{profile.name}</h4>
                                <p>{profile.email}</p>
                                {profile.profilePicture && <img src={profile.profilePicture} alt="Profile" style={{ width: '50px', height: '50px' }} />}
                                <IonButton onClick={() => editProfile(profile)} size="small">Edit</IonButton>
                                <IonButton color="danger" onClick={() => deleteProfile(profile.id)} size="small">Delete</IonButton>
                            </div>
                        </IonItem>
                    ))}
                </IonList>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
