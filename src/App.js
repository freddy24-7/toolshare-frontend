import { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import JwtContext from "./jwt-helper/jwt-context";
import ProfilePage from "./pages/ProfilePage";

function App() {

    const authCtx = useContext(JwtContext);

      return (
        <Layout>
          <Switch>
              {/*<Route exact path='/' >*/}
              {/*    <HomePage />*/}
              {/*</Route>*/}
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={RegisterPage} />

              {/*{!authCtx.isLoggedIn && (*/}
              {/*<Route path='/login' >*/}
              {/*    */}
              {/*    <RegisterPage />*/}
              {/*</Route>)}*/}

              {/*<Route path='/profile'>*/}
              {/*    {authCtx.isLoggedIn && <ProfilePage />}*/}
              {/*    {!authCtx.isLoggedIn && <Redirect to='/login' />}*/}
              {/*</Route>*/}
              {/*<Route path='*'>*/}
              {/*    <Redirect to='/' />*/}
              {/*</Route>*/}
          </Switch>
        </Layout>
      );
    }

export default App;

