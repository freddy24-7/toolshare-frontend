import {SIGN_IN_URL} from "../../backend-urls/constants";
import {useState} from 'react';
import { useHistory} from 'react-router-dom';

import classes from './RegistrationForm.module.css';
import RegistrationService from "../../services/RegistrationService";
import axios from "axios";

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameInputChangeHandler = (event) => {
        setUsername(event.target.value);
    }
    const passwordInputChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const data = {username, password}

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post(SIGN_IN_URL, data)
            .then(response => {
                localStorage.setItem('token', response.data.token);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <section className={classes.auth}>
            <h1>Log In</h1>
            <form onSubmit={submitHandler}>

                <div className={classes.control}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type="text"
                        placeholder= "Enter username"
                        name= "username"
                        className= "form-control"
                        value={data.username}
                        onChange={usernameInputChangeHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder= "Enter password"
                        value={data.password}
                        onChange={passwordInputChangeHandler}
                    />
                </div>
                <div className={classes.actions}>
                        <button>Log In</button>
                </div>
            </form>
        </section>
    );
};

export default LoginForm;