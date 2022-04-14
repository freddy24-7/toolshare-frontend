//Next: CSS code from previos chapter
//and character limitations
//same for username and password

import {SIGN_UP_URL, SIGN_IN_URL} from "../../backend-urls/constants";
import {useState, useRef, useContext, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import JwtContext from "../../jwt-helper/jwt-context";
import classes from './RegistrationForm.module.css';
import RegistrationService from "../../services/RegistrationService";

const RegistrationForm = () => {

    const history = useHistory();
    //Below are added the fields from spring security set-up in backend
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //Below constants are for frontend validation purposes
    const nameInputRef = useRef()
    const [enteredName, setEnteredName] =

    useEffect(() => {
        if (inputIsValid) {
            console.log("Inputs are valid!")
        }
    },[inputIsValid]);


    // const nameInputRef = useRef();
    // const usernameInputRef = useRef();
    // const passwordInputRef = useRef();

    //This will manage authentication
    const authCtx = useContext(JwtContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    //This handler toggles between registration and log-in
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setInputIsTouched(true);

        //Validation, specifying field lengths that are valid
        if (name.trim() || username.trim() || password.trim() === '') {
            setInputIsValid(false);
            return;
            // if (((name.value.length > 21 )) || username.value.length > 21) || password.value.length > 21)
            // {
            //     setInputIsValid(false);
            // }
            // else if (((name.value.length < 4) || username.value.length < 6) || password.value.length < 9)
            // {
            //     setInputIsValid(false);
            // }
            // return;
        }

        setInputIsValid(true);

        const user = {name, username, password}

        // const enteredName = nameInputRef.current.value;
        // const enteredUsername = usernameInputRef.current.value;
        // const enteredPassword = passwordInputRef.current.value;

        // Todo: Add validation
        const enteredValue = nameInputRef.current.value;
        console.log(enteredValue)


        setIsLoading(true);
        let url;
        if (isLogin) {
            url = SIGN_UP_URL
        } else {
            url = SIGN_IN_URL
        }
        RegistrationService.register(user).then((response) => {

            console.log(response.data)

            history.push('/')
            // if (response.data.ok) {
            //     setIsLoading(false);
            // } else {
            //     let errorMessage = 'Authentication failed!';
            //     throw new Error(errorMessage);
            //
            // }


        })

            // UpdateTable()

        // }).catch(error => {
        //     console.log(error)
        // }).then((res) => {
        //         setIsLoading(false);
        //         // if (res.ok) {
        //         //     return res.json();
        //         } else {
        //             return res.json().then((data) => {
        //                 let errorMessage = 'Authentication failed!';
        //                 // if (data && data.error && data.error.message) {
        //                 //   errorMessage = data.error.message;
        //                 // }
        //
        //                 throw new Error(errorMessage);
        //             });
        //         }
        //     })
        //     .then((data) => {
        //         const expirationTime = new Date(
        //             new Date().getTime() + +data.expiresIn * 1000
        //         );
        //         authCtx.login(data.idToken, expirationTime.toISOString());
        //         history.replace('/');
        //     })
        //     .catch((err) => {
        //         alert(err.message);
        //     });
    };
    const inputIsInValid = !inputIsValid && inputIsTouched;

    const inputClasses = inputIsValid
        ? classes.authinvalid
        : classes.auth;

    return (
        <section className={inputClasses}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='name'>Full Name</label>
                    <input
                        ref={nameInputRef}
                        type="text"
                        placeholder= "Enter full name"
                        name= "fullName"
                        className= "form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                        {inputIsInValid && (
                            <p className={classes.errortext}>Entries must be between 4 and 20 characters</p>
                        )}
                </div>
                <div className={classes.control}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type="text"
                        placeholder= "Enter username"
                        name= "username"
                        className= "form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                        {inputIsInValid && (
                            <p className={classes.errortext}>Entries must be between 5 and 20 characters</p>)
                        }
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder= "Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {inputIsInValid && (
                        <p className={classes.errortext}>Entries must be between 8 and 20 characters</p>
                    )}
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    )}
                    {isLoading && <p>Success !!! </p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default RegistrationForm;