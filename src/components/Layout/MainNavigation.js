import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import {AuthContext} from '../../context/AuthContext';

const MainNavigation = () => {
    const { isAuth, logout } = useContext(AuthContext);
    const history = useHistory();

    return (
        <nav>
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>Tool Share</div>
            </Link>


            {isAuth ?
                <button
                    type="button"
                    onClick={logout}
                >
                    Logout
                </button>
                :

                <div>
                    <button
                        type="button"
                        onClick={() => history.push('/login')}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={() => history.push('/register')}
                    >
                        Register
                    </button>
                </div>
            }
        </header>
        </nav>
    );
};



export default MainNavigation;