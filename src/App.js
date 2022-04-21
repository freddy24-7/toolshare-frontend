import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import {AuthContext} from "./context/AuthContext";

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <Layout />
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/profile">
                        {isAuth ? <ProfilePage /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/register">
                        <RegisterPage />
                    </Route>
                </Switch>
            </div>
        </>
    );
}



export default App;

