import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {SIGN_IN_URL} from "../../backend-urls/constants";

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const result = await axios.post(SIGN_IN_URL, {
                username: username,
                password: password,
            });
            // log het resultaat in de console
            console.log(result.data);

            // geef de JWT token aan de login-functie van de context mee
            login(result.data.token);

        } catch(e) {
            console.error(e);
            toggleError(true);
            console.log(error);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="Usernamefield">
                    Username:
                    <input
                        type="username"
                        id="username-field"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label htmlFor="password-field">
                    Password:
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

                <button
                    type="submit"
                    className="form-button"
                >
                    Inloggen
                </button>
            </form>

            <p>Heb je nog geen account? <Link to="/login">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;