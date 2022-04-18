import {SIGN_UP_URL, SIGN_IN_URL} from "../../backend-urls/constants";
import {useState, useRef, useContext, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import JwtContext from "../../jwt-helper/jwt-context";
import classes from './RegistrationForm.module.css';
import RegistrationService from "../../services/RegistrationService";

const RegistrationForm = (props) => {

    const history = useHistory();
    //Below are added fields from spring security set-up in backend (user class)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Constants used for frontend validation
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(false)
    const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState(false)
    const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false)
    const [enteredNameTouched, setEnteredNameTouched] = useState(false)
    const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false)
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false)

    //Creating the variable that will be used to store the JWT token
    // const user = {name, username, password}
    const [user, setUser] = useState({name, username, password})
    console.log(user);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    //Variables used for the form submission and authentication
    const authCtx = useContext(JwtContext);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    //Change handlers for submission field below
    const nameInputChangeHandler = (event) => {
        setName(event.target.value);
    }
    const usernameInputChangeHandler = (event) => {
        setUsername(event.target.value);
    }
    const passwordInputChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    //This handler toggles between registration and log-in
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    //For validation purposes
    useEffect(() => {
        if (enteredNameIsValid) {
            console.log("enteredNameIsValid is true")
        }
    }, [enteredNameIsValid]);


    //Forms
    const submitHandler = (event) => {
        event.preventDefault();
        setUser((prevState => {
            return {
                ...prevState,
                name: name,
                username: username,
                password: password
            }
        }))
    }


    //Upon submission
    setEnteredNameTouched(true)
    setEnteredUsernameTouched(true)
    setEnteredPasswordTouched(true)

    //Validation checks for length of name, username, and password
    if (name.trim() === '') {
        setEnteredNameIsValid(false);
        return;
    }
    setEnteredNameIsValid(true)
    console.log(name);

    if (username.trim() === '') {
        setEnteredUsernameIsValid(false);
        return;
    }
    setEnteredUsernameIsValid(true)
    console.log(username);

    if (password.length < 8 || password.length > 16) {
        setEnteredPasswordIsValid(false);
        return;
    }
    setEnteredPasswordIsValid(true);
    console.log(password);


    setIsLoading(true);
    let url;
    if (isLogin) {
        url = SIGN_UP_URL
    } else {
        url = SIGN_IN_URL
    }

    RegistrationService.register(user, url)
        .then(response => {
            console.log(response);
            history.push('/login');
            }),
        else {
            console.log("Error");
            setIsLoading(false);
        }


    },

    )};

RegistrationService.login(user, url)
        .then(
            data => {
                dispatch.setUser(data);
                props.history.push('/profile');
            })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
            }),
        setIsLoading(true);

    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    const usernameInputIsInvalid = !enteredUsernameIsValid && enteredUsernameTouched;
    const passwordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

    const InputClasses = nameInputIsInvalid || usernameInputIsInvalid || passwordInputIsInvalid
        ? classes.authinvalid
        : classes.auth;

    return (
        <section className={InputClasses}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='name'>Full Name</label>
                    <input
                        type="text"
                        placeholder= "Enter full name"
                        name= "fullName"
                        className= "form-control"
                        value={name}
                        onChange={nameInputChangeHandler}
                    />
                    {nameInputIsInvalid && <p className={classes.error}>Please enter a valid name</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type="text"
                        placeholder= "Enter username"
                        name= "username"
                        className= "form-control"
                        value={username}
                        onChange={usernameInputChangeHandler}
                    />
                    {usernameInputIsInvalid && <p className={classes.error}>Please enter a valid username</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder= "Enter password"
                        value={password}
                        onChange={passwordInputChangeHandler}
                    />
                    {passwordInputIsInvalid && <p className={classes.error}>Password needs 8 to 16 characters</p>}
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    )}
                    {isLoading && <p>Your inputs are ok!</p>}
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