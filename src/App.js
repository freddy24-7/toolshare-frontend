import {useContext} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/Registration/LoginForm";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./context/AuthContext";

function App() {

    const authContext = useContext(AuthContext)

    return (
        <Layout>
          <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route path="/profile" component={ProfilePage} />}
              {/*<Route path="*">*/}
              {/*    <Redirect to="/" />*/}
              {/*</Route>*/}
          </Switch>
        </Layout>
      );
    }

export default App;

