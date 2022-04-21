import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {PROFILE_URL} from "../backend-urls/constants";

const ProfilePage = () => {

    const [profileData, setProfileData] = useState({});
    const { user } = useContext(AuthContext);

    // useEffect(() => {
        // we halen de pagina-content op in de mounting-cycle
        // async function fetchProfileData() {
            // haal de token uit de Local Storage om in het GET-request te bewijzen dat we geauthoriseerd zijn
            const token = localStorage.getItem('token');

            const result = async() => {
                await axios.get(PROFILE_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(result.data);

                function error() {
                    console.log('error');
                }
                console.log(error);
            }
            console.log(result);
            console.log(profileData);
            console.log(token);



    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
            </section>

            {/*Als er keys in ons object zitten hebben we data, en dan renderen we de content*/}
            {Object.keys(profileData).length > 0 &&
            <section>
                <h2>Strikt geheime profiel-content</h2>
                <h3>{profileData.title}</h3>
                <p>{profileData.content}</p>
            </section>
            }
            <p>Terug naar de <Link to="/">HomePage</Link></p>
        </>
    );
}

export default ProfilePage;

